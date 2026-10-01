// =========================================================
// CALEON HOTSITE - script.js
// Menu mobile, animações e navegação suave
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // ELEMENTOS DO SITE
  // =========================
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");


  // =========================
  // MENU MOBILE
  // =========================
  function setMenu(open) {

    if (!menuButton || !nav) {
      return;
    }

    if (open) {
      menuButton.classList.add("active");
      nav.classList.add("open");
      document.body.classList.add("menu-open");

      menuButton.setAttribute("aria-expanded", "true");
    } else {
      menuButton.classList.remove("active");
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");

      menuButton.setAttribute("aria-expanded", "false");
    }
  }


  if (menuButton && nav) {

    menuButton.addEventListener("click", function () {

      const menuAberto = nav.classList.contains("open");

      setMenu(!menuAberto);

    });


    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        setMenu(false);

      });

    });


    window.addEventListener("resize", function () {

      if (window.innerWidth > 1020) {

        setMenu(false);

      }

    });

  }


  // =========================
  // ANIMAÇÕES AO ROLAR A TELA
  // =========================
  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );


    revealElements.forEach(function (element) {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  // =========================
  // DESTACAR ITEM DO MENU
  // =========================
  if ("IntersectionObserver" in window && sections.length > 0) {

    const sectionObserver = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) {
            return;
          }


          const sectionId = entry.target.id;


          navLinks.forEach(function (link) {

            const href = link.getAttribute("href");


            if (href === "#" + sectionId) {

              link.classList.add("is-active");

            } else {

              link.classList.remove("is-active");

            }

          });

        });

      },

      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      }

    );


    sections.forEach(function (section) {

      sectionObserver.observe(section);

    });

  }


  // =========================
  // ROLAGEM SUAVE
  // =========================
  const linksInternos = document.querySelectorAll('a[href^="#"]');


  linksInternos.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const destinoId = link.getAttribute("href");


      if (!destinoId || destinoId === "#") {
        return;
      }


      const destino = document.querySelector(destinoId);


      if (destino) {

        event.preventDefault();


        destino.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }

    });

  });

});
