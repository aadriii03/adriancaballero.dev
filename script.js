// Loader inicial + typing hero
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("loader-overlay");
  const barFill = document.getElementById("loader-bar-fill");
  const loaderTextEl = document.getElementById("loader-text");
  const typingEl = document.getElementById("typing-text");

  const loaderText = "Bienvenido";
  const heroText = "Ingeniero Informático • Desarrollador Full-Stack";

  let i = 0;
  let heroIndex = 0;

  function typeLoader() {
    if (i < loaderText.length && loaderTextEl) {
      const span = document.createElement("span");
      span.textContent = loaderText.charAt(i);
      span.classList.add("letter-glow");
      loaderTextEl.appendChild(span);
      i++;
      setTimeout(typeLoader, 70);
    }
  }

  function typeHero() {
    if (heroIndex < heroText.length && typingEl) {
      typingEl.textContent += heroText.charAt(heroIndex);
      heroIndex++;
      setTimeout(typeHero, 55);
    }
  }

  typeLoader();

  if (barFill) {
    setTimeout(() => {
      barFill.style.width = "100%";
    }, 300);
  }

  
// Menú móvil toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

toggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  if (!menu.classList.contains('hidden')) {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
  }
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
  });
});

// Particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    color: { value: ["#75020f", "#51080d", "#2b0307"] },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#51080d",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" }
    },
    modes: {
      grab: { distance: 130, line_linked: { opacity: 0.5 } }
    }
  },
  retina_detect: true
});

// Animación general al hacer scroll
const elements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Animación "Sobre mí"
const sobreMi = document.querySelector('#sobremi');
const spans = document.querySelectorAll('#sobremi p span');

if (sobreMi) {
  const obsSobreMi = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spans.forEach((span, i) => {
          span.style.animationDelay = `${i * 0.3}s`;
          span.style.animationPlayState = 'running';
        });
        obsSobreMi.unobserve(sobreMi);
      }
    });
  }, { threshold: 0.3 });

  obsSobreMi.observe(sobreMi);
}

// Menú lateral activo
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#side-menu .menu-btn");

const observerMenu = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`#side-menu a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(btn => btn.classList.remove("active"));
      link?.classList.add("active");
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observerMenu.observe(section));

// Fade in secuencial
const fadeItems = document.querySelectorAll('.fade-in-sequence');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

fadeItems.forEach(item => fadeObserver.observe(item));

// Soft Skills animación secuencial
const softskills = document.querySelectorAll("#softskills .softskill-card");

const softskillsObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        const card = entry.target;
        card.classList.add("visible", "animating");
        setTimeout(() => card.classList.remove("animating"), 800);
      }, i * 250);
      softskillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

softskills.forEach(card => softskillsObserver.observe(card));

// Proyectos animación secuencial
const projects = document.querySelectorAll("#proyectos .project-card");

const projectsObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        const card = entry.target;
        card.classList.add("visible", "animating");
        setTimeout(() => card.classList.remove("animating"), 800);
      }, i * 300);
      projectsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

projects.forEach(card => projectsObserver.observe(card));

  setTimeout(() => {
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        typeHero();
      }, 700);
    } else {
      typeHero();
    }
  }, 3000);
});

// Animación secuencial de los contenedores de las tecnologías
const techCards = document.querySelectorAll('.tech-card');

const techObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 120); // delay entre iconos
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

techCards.forEach(card => techObserver.observe(card));
