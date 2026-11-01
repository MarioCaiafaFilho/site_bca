/* ======================================================
   CONFIGURAÇÃO DO WHATSAPP
====================================================== */

/*
  Coloque abaixo o número que receberá os contatos.

  Formato:
  código do país + DDD + número

  Exemplo:
  5524999999999

  Não use:
  + ( )
  espaços
  hífens
*/

const WHATSAPP_NUMBER = "5524993103754";


/* ======================================================
   ELEMENTOS PRINCIPAIS
====================================================== */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const currentYear = document.getElementById("current-year");


/* ======================================================
   MENU MOBILE
====================================================== */

function closeMenu() {
  if (!nav || !menuToggle) return;

  nav.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");

  menuToggle.textContent = "☰";
}


function openMenu() {
  if (!nav || !menuToggle) return;

  nav.classList.add("active");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");

  menuToggle.textContent = "✕";
}


if (menuToggle && nav) {

  menuToggle.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpen = nav.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  /* Fecha depois de clicar em um item do menu */

  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  /* Fecha ao clicar fora */

  document.addEventListener("click", (event) => {

    if (!nav.classList.contains("active")) return;

    const clickedInsideNav = nav.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedMenuButton) {
      closeMenu();
    }

  });


  /* Fecha com ESC */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      nav.classList.contains("active")
    ) {
      closeMenu();
      menuToggle.focus();
    }

  });


  /*
    Se o usuário aumentar a tela depois de abrir
    o menu mobile, limpamos o estado.
  */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 980) {
      closeMenu();
    }

  });

}


/* ======================================================
   ANO AUTOMÁTICO NO RODAPÉ
====================================================== */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* ======================================================
   WHATSAPP CONTEXTUALIZADO
====================================================== */

const whatsappLinks = document.querySelectorAll(".whatsapp-link");

whatsappLinks.forEach((link) => {

  const message =
    link.dataset.whatsappMessage ||
    "Olá, Mário. Vim pelo seu site e gostaria de conversar.";

  const encodedMessage = encodeURIComponent(message);

  link.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  link.target = "_blank";

  link.rel = "noopener noreferrer";

});


/* ======================================================
   ANIMAÇÕES AO ROLAR
====================================================== */

const revealElements = document.querySelectorAll(
  [
    ".section-heading",
    ".card",
    ".highlight-block",
    ".wide-card",
    ".about-content",
    ".about-image"
  ].join(", ")
);


/*
  Verifica se o visitante pediu redução
  de animações no sistema operacional.
*/

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


if (!prefersReducedMotion) {

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("reveal-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    /*
      Fallback para navegadores antigos.
      Se IntersectionObserver não existir,
      mostramos tudo normalmente.
    */

    revealElements.forEach((element) => {
      element.classList.add("reveal-visible");
    });

  }

} else {

  /*
    Usuário prefere menos movimento:
    nenhum conteúdo fica escondido.
  */

  revealElements.forEach((element) => {
    element.classList.add("reveal-visible");
  });

}