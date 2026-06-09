/* =============================================
   STELARON — SCRIPT.JS
   Production-Ready Vanilla JavaScript
   ============================================= */

'use strict';

/* ── NAVBAR SCROLL EFFECT ─────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    lastScroll = y;
  }, { passive: true });

  // Mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

/* ── HERO CANVAS PARTICLE FIELD ─────────────── */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const PARTICLE_COUNT = window.innerWidth < 600 ? 50 : 100;
  const MAX_DIST = 130;
  const ACCENT = '124,58,237';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(rand) {
      this.x  = Math.random() * W;
      this.y  = rand ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.r  = Math.random() * 1.5 + 0.5;
      this.a  = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset(false);
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT},${this.a})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const a = (1 - d / MAX_DIST) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT},${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    cancelAnimationFrame(animId);
    loop();
  }

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 150);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      loop();
    }
  });

  init();
})();

/* ── SCROLL REVEAL ───────────────────────── */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(el => observer.observe(el));
})();

/* ── FAQ ACCORDION ─────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        const a = openItem.querySelector('.faq-a');
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        a.style.maxHeight = '0px';
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ── NEWSLETTER ─────────────────────────── */
function handleSubscribe(e) {
  e.preventDefault();
  const form    = e.target;
  const input   = form.querySelector('input[type="email"]');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  if (!input || !input.value) return;

  // Simulate submission
  btn.disabled = true;
  btn.textContent = 'Subscribing…';

  setTimeout(() => {
    input.value = '';
    btn.textContent = 'Done ✓';
    if (success) success.classList.add('show');
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = 'Subscribe Free <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }, 3000);
  }, 1200);
}

/* ── SMOOTH ANCHOR SCROLLING ─────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── TOOL CARD TILT EFFECT ─────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.tool-card, .workflow-card, .compare-card');
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const STRENGTH = 6; // max degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-4px) rotateY(${dx * STRENGTH}deg) rotateX(${-dy * STRENGTH}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── ACTIVE NAV LINK ON SCROLL ───────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── PREMIUM VAULT HOVER SHIMMER ─────────── */
(function initVaultShimmer() {
  document.querySelectorAll('.vault-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.boxShadow = '0 0 25px rgba(251,191,36,0.12)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.boxShadow = '';
    });
  });
})();

/* ── NAV ACTIVE STYLE HELPER ─────────────── */
(function addNavActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: #fff !important; background: rgba(255,255,255,0.07) !important; }`;
  document.head.appendChild(style);
})();

/* ── PERFORMANCE: defer non-critical tasks ── */
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload any LCP candidate images
    const links = document.querySelectorAll('a[href]');
    links.forEach(l => {
      if (l.hostname !== location.hostname) {
        l.setAttribute('rel', l.getAttribute('rel') ? l.getAttribute('rel') + ' noopener' : 'noopener');
      }
    });
  });
}

/* ── EASTER EGG (console) ─────────────────── */
console.log(
  '%c✦ STELARON %c— Built for the ambitious. Powered by AI.',
  'color:#7C3AED;font-weight:800;font-size:16px;',
  'color:#94A3B8;font-size:13px;'
);
