/* ============================================
   NOOR-UL-AIN PORTFOLIO — script.js
   ============================================ */

// ── NAV SCROLL EFFECT ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── HAMBURGER MENU ─────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── TERMINAL ANIMATION ─────────────────────
const terminalLines = [
  { type: 'prompt', text: 'whoami' },
  { type: 'output', text: 'Noor-ul-ain M Ali · 24F-3110' },
  { type: 'prompt', text: 'cat skills.txt' },
  { type: 'output', text: 'C++ · Python · Java · SQL · R · JS' },
  { type: 'prompt', text: 'ls projects/' },
  { type: 'output', text: 'NovaSLN_OS/  AirQuality/  RealEstate/' },
  { type: 'dim',    text: 'AirTraffic/  SmartQueue/  StoreApp/' },
  { type: 'prompt', text: 'echo $status' },
  { type: 'output', text: 'Seeking internship opportunities 🚀' },
];

const terminalBody = document.getElementById('terminalBody');

function buildTerminal() {
  let delay = 300;

  terminalLines.forEach((line, i) => {
    setTimeout(() => {
      const span = document.createElement('span');
      span.classList.add('t-line');
      span.style.animationDelay = '0ms';

      if (line.type === 'prompt') {
        span.innerHTML = `<span class="t-prompt">❯ </span>${escapeHtml(line.text)}`;
      } else if (line.type === 'output') {
        span.classList.add('t-output');
        span.textContent = line.text;
      } else if (line.type === 'dim') {
        span.classList.add('t-dim');
        span.textContent = line.text;
      }

      // Remove cursor from previous last element
      const prevCursor = terminalBody.querySelector('.cursor');
      if (prevCursor) prevCursor.remove();

      terminalBody.appendChild(span);

      // Add blinking cursor after last line
      if (i === terminalLines.length - 1) {
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        terminalBody.appendChild(cursor);
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, delay);

    delay += line.type === 'prompt' ? 600 : 300;
  });
}

// Start terminal after a short delay
setTimeout(buildTerminal, 800);

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── SCROLL REVEAL ──────────────────────────
const revealElements = document.querySelectorAll(
  '.project-card, .skill-group, .info-card, .contact-card, .about-stats, .hero-content'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK HIGHLIGHT ──────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
