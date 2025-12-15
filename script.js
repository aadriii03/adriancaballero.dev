// Menú móvil toggle
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

toggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  // Cambia el icono (☰ ↔ ✕)
  if (!menu.classList.contains('hidden')) {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('hidden');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />';
  });
});

// Particles.js configuración
particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    color: { value: ["#75020f", "#51080d", "#2b0307"] },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: "#51080d", opacity: 0.40, width: 1 },
    move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false } },
    modes: { grab: { distance: 130, line_linked: { opacity: 0.5 } } }
  },
  retina_detect: true
});

// Animación al hacer scroll
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

// Activador de animación Sobre mí
const sobreMi = document.querySelector('#sobremi');
const spans = document.querySelectorAll('#sobremi p span');

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

// Animación de barras de progreso
const bars = document.querySelectorAll('.progress-bar');
const observerBars = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const value = parseInt(bar.getAttribute('data-value'));
      const label = bar.parentElement.previousElementSibling.querySelector('.progress-text');
      
      bar.style.transition = 'width 1.8s cubic-bezier(0.23, 1, 0.32, 1)';
      bar.style.width = value + '%';

      let count = 0;
      const updateNumber = setInterval(() => {
        if (count >= value) clearInterval(updateNumber);
        else {
          count++;
          label.textContent = count + '%';
        }
      }, 20);
      observerBars.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
bars.forEach(bar => observerBars.observe(bar));

// Detectar la sección visible y resaltar el icono activo
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

// Ordenar bloques de progreso de mayor a menor según data-value
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll("#conocimientos .space-y-8");

  containers.forEach(container => {
    const items = Array.from(container.children);

    // Ordenar por valor numérico del atributo data-value
    items.sort((a, b) => {
      const valueA = parseInt(a.querySelector('.progress-bar').getAttribute('data-value'));
      const valueB = parseInt(b.querySelector('.progress-bar').getAttribute('data-value'));
      return valueB - valueA; // mayor a menor
    });

    // Reinsertar en orden
    items.forEach(item => container.appendChild(item));
  });
});

// Fade in sequence
const fadeItems = document.querySelectorAll('.fade-in-sequence');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200); // 200 ms entre cada bloque
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
fadeItems.forEach(item => fadeObserver.observe(item));

// Animación secuencial de Soft Skills (solo borde + icono)
const softskills = document.querySelectorAll("#softskills .softskill-card");

const softskillsObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        const card = entry.target;
        card.classList.add("visible", "animating");
        setTimeout(() => card.classList.remove("animating"), 800); // vuelve al color original
      }, i * 250); // 250 ms entre tarjetas
      softskillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

softskills.forEach(card => softskillsObserver.observe(card));

// Animación secuencial de los proyectos (borde + título)
const projects = document.querySelectorAll("#proyectos .project-card");

const projectsObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        const card = entry.target;
        card.classList.add("visible", "animating");
        setTimeout(() => card.classList.remove("animating"), 800);
      }, i * 300); // 300 ms entre tarjetas
      projectsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

projects.forEach(card => projectsObserver.observe(card));

// Loader inicial
document.addEventListener("DOMContentLoaded", () => {
  const overlay      = document.getElementById("loader-overlay");
  const barFill      = document.getElementById("loader-bar-fill");
  const loaderTextEl = document.getElementById("loader-text");
  const loaderText   = "Bienvenido";
  const heroText   = "Ingeniero Informático • Desarrollador Full-Stack";
  const typingEl   = document.getElementById("typing-text");
  let heroIndex    = 0;

  function typeHero() {
    if (!typingEl) return;
    if (heroIndex < heroText.length) {
      typingEl.textContent += heroText.charAt(heroIndex);
      heroIndex++;
      setTimeout(typeHero, 55);
    }
  }

  let i = 0;
  function typeLoader() {
    if (!loaderTextEl) return;
    if (i < loaderText.length) {
      const span = document.createElement("span");
      span.textContent = loaderText.charAt(i);
      span.classList.add("letter-glow");
      loaderTextEl.appendChild(span);
      i++;
      setTimeout(typeLoader, 70);
    }
  }

  typeLoader();

  if (barFill) {
    setTimeout(() => {
      barFill.style.width = "100%";
    }, 300);
  }

  setTimeout(() => {
    if (overlay) {
      overlay.style.transition = "opacity 0.7s ease";
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
