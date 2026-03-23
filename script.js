/* ================================================================
   WILD & POTTY — Scripts
   ================================================================ */

/* ── Sticky nav ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Burger menu ── */
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.about__grid, .work-card, .class-card, .location__grid, .philosophy__quote, .section-tag, .section-title, .section-intro'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger child cards
  if (el.classList.contains('work-card') || el.classList.contains('class-card')) {
    const siblings = Array.from(el.parentElement.children);
    const idx = siblings.indexOf(el);
    if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 5)}`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── Contact form ── */
const form         = document.getElementById('contactForm');
const confirmation = document.getElementById('contactConfirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // In production this would POST to a backend / form service
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ── Smooth active nav link highlighting ── */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? '#fff'
          : 'rgba(255,255,255,0.75)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Subtle parallax on hero blobs ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const blobs = document.querySelectorAll('.hero__bg-blobs .blob');
  blobs.forEach((b, i) => {
    const speed = 0.04 + i * 0.02;
    b.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });
