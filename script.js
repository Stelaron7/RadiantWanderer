/* ================================================
   STELARON OS — SCRIPT.JS
   Production JavaScript — No Dependencies
   ================================================ */

'use strict';

/* ── UTILITIES ─────────────────────────────── */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ── NAVBAR ─────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

/* ── HERO NEURAL NETWORK CANVAS ─────────────── */
(function initNeuralCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = () => window.innerWidth < 640;
  let W, H, nodes = [], animId;

  const NODE_COUNT = () => isMobile() ? 40 : 80;
  const MAX_DIST   = () => isMobile() ? 100 : 140;

  const COLORS = [
    [110, 231, 255],  // signal cyan
    [167, 139, 250],  // pulse violet
    [255, 107, 53],   // ember
  ];

  class Node {
    constructor() { this.spawn(true); }
    spawn(random) {
      this.x  = Math.random() * W;
      this.y  = random ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.25 + 0.08);
      this.r  = Math.random() * 1.8 + 0.5;
      this.a  = Math.random() * 0.5 + 0.15;
      this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    tick() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < -10) this.spawn(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.c.join(',')},${this.a})`;
      ctx.fill();
    }
  }

  function drawEdges() {
    const md = MAX_DIST();
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < md) {
          const a = (1 - d / md) * 0.15;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(110,231,255,${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => { n.tick(); n.draw(); });
    drawEdges();
    animId = requestAnimationFrame(loop);
  }

  function init() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
    nodes = Array.from({ length: NODE_COUNT() }, () => new Node());
    cancelAnimationFrame(animId);
    loop();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId); else loop();
  });
  init();
})();

/* ── SCORE RING CANVAS ──────────────────────── */
(function initScoreRing() {
  const canvas = document.getElementById('scoreRing');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 200, H = 200;
  const cx = W / 2, cy = H / 2, R = 82, TRACK_W = 10;
  let currentAngle = 0;
  const targetAngle = (72 / 100) * Math.PI * 2;

  function draw(angle) {
    ctx.clearRect(0, 0, W, H);

    // Track rings
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, R - i * 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.04 - i * 0.01})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Background arc
    ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = TRACK_W;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Gradient arc
    const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
    grad.addColorStop(0,   '#6EE7FF');
    grad.addColorStop(0.5, '#A78BFA');
    grad.addColorStop(1,   '#FF6B35');
    ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + angle);
    ctx.strokeStyle = grad;
    ctx.lineWidth = TRACK_W;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Glow dot at tip
    const tipX = cx + R * Math.cos(-Math.PI / 2 + angle);
    const tipY = cy + R * Math.sin(-Math.PI / 2 + angle);
    const grd = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 12);
    grd.addColorStop(0, 'rgba(110,231,255,0.6)');
    grd.addColorStop(1, 'rgba(110,231,255,0)');
    ctx.beginPath();
    ctx.arc(tipX, tipY, 12, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function animate() {
    if (currentAngle < targetAngle) {
      currentAngle = Math.min(currentAngle + 0.04, targetAngle);
      draw(currentAngle);
      requestAnimationFrame(animate);
    } else {
      draw(targetAngle);
    }
  }

  // Start after a short delay for cinematic effect
  setTimeout(animate, 600);
})();

/* ── HUD METRIC BARS ────────────────────────── */
(function initMetricBars() {
  const bars = $$('.metric-bar');
  if (!bars.length) return;

  let done = false;
  const observer = new IntersectionObserver(entries => {
    if (done) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        done = true;
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.val + '%';
          }, i * 100 + 400);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metrics = document.getElementById('hudMetrics');
  if (metrics) observer.observe(metrics);
})();

/* ── ROTATING HUD INSIGHTS ──────────────────── */
(function initHudInsights() {
  const el = document.getElementById('hudInsight');
  if (!el) return;

  const insights = [
    'Wealth gap detected. 3 high-leverage opportunities identified.',
    'Focus score below threshold. Recommend system restructure.',
    'Career trajectory misaligned with income goals by 34%.',
    'Learning velocity: high. Monetization strategy: missing.',
    'Discipline patterns suggest untapped productivity of 2.4×.',
  ];

  let i = 0;
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => {
      i = (i + 1) % insights.length;
      el.textContent = insights[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 350);
  }, 4000);
})();

/* ── SCROLL REVEAL ──────────────────────────── */
(function initReveal() {
  const els = $$('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }, delay);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── TRANSITION LINE ANIMATION ──────────────── */
(function initTransitionLine() {
  const line = $('.transition-line');
  if (!line) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      $$('.tl-fill', line).forEach((fill, i) => {
        setTimeout(() => { fill.style.width = '100%'; fill.style.transition = 'width 1.2s ease'; }, i * 200);
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(line);
})();

/* ── TIMELINE VIS ANIMATION ─────────────────── */
(function initTimeline() {
  const tvisLine = $('.tvis-line');
  const milestones = $$('.tvis-ms');
  if (!tvisLine) return;

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    tvisLine.classList.add('grown');
    milestones.forEach((ms, i) => {
      setTimeout(() => { ms.classList.add('visible'); }, 400 + i * 300);
    });
    observer.disconnect();
  }, { threshold: 0.3 });

  observer.observe(tvisLine);
})();

/* ── ANIMATED COUNTERS ──────────────────────── */
(function initCounters() {
  const nums = $$('[data-count]');
  if (!nums.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const isFloat = target % 1 !== 0;
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const t = clamp((now - start) / duration, 0, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = lerp(0, target, ease);
      el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();

/* ── SMOOTH SCROLL ──────────────────────────── */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 75, behavior: 'smooth' });
    });
  });
})();

/* ── MODULE CARD MICRO-TILT ──────────────────── */
(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.module-card, .testimonial-card, .hud-frame, .timeline-vis').forEach(card => {
    const S = 5;
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform = `translateY(-4px) rotateY(${dx * S}deg) rotateX(${-dy * S}deg) perspective(800px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ── RADAR MINI VIZ ─────────────────────────── */
(function initRadarViz() {
  const container = document.getElementById('radarViz');
  if (!container) return;

  // Create a small animated radar sweep line
  const sweep = document.createElement('div');
  sweep.style.cssText = `
    position:absolute;
    top:50%;left:50%;
    width:50%;height:1px;
    background:linear-gradient(90deg,rgba(110,231,255,0.6),transparent);
    transform-origin:left center;
    animation:radarSweep 3s linear infinite;
  `;

  // Blip dots
  const blips = [[60,30],[120,70],[40,90],[100,50],[80,110]];
  blips.forEach(([x,y]) => {
    const dot = document.createElement('div');
    const delay = Math.random() * 2;
    dot.style.cssText = `
      position:absolute;
      width:5px;height:5px;
      border-radius:50%;
      background:#6EE7FF;
      top:${y/2}px;left:${x/2}px;
      box-shadow:0 0 6px #6EE7FF;
      opacity:0;
      animation:blipFade 3s ${delay}s infinite;
    `;
    container.appendChild(dot);
  });
  container.appendChild(sweep);
})();

/* ── ADD RADAR KEYFRAMES DYNAMICALLY ─────────── */
(function addRadarStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes radarSweep {
      0%   { transform: rotate(0deg);   }
      100% { transform: rotate(360deg); }
    }
    @keyframes blipFade {
      0%,100% { opacity: 0; transform: scale(0.5); }
      30%,60% { opacity: 0.9; transform: scale(1); }
    }
    .nav-links a.is-active {
      color: #F0F4FF !important;
      background: rgba(255,255,255,0.06) !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ── ACTIVE NAV LINK ─────────────────────────── */
(function initActiveNav() {
  const sections = $$('section[id]');
  const links    = $$('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-active'));
      const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (a) a.classList.add('is-active');
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── PREMIUM BUTTON RIPPLE ───────────────────── */
(function initRipple() {
  const btn = document.getElementById('unlockBtn');
  if (!btn) return;

  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      width:200px;height:200px;
      background:rgba(255,255,255,0.15);
      border-radius:50%;
      left:${x - 100}px;top:${y - 100}px;
      pointer-events:none;
      transform:scale(0);
      animation:rippleAnim 0.6s ease forwards;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes rippleAnim { to { transform: scale(2); opacity: 0; } }`;
  document.head.appendChild(style);
})();

/* ── CONSOLE SIGNATURE ───────────────────────── */
console.log(
  '%cSTELARON OS%c\nBuild the future version of yourself.',
  'font-family:monospace;font-size:18px;font-weight:bold;color:#6EE7FF;',
  'font-family:monospace;font-size:11px;color:#64748B;'
);
