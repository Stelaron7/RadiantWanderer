/* ═══════════════════════════════════════════
   STELARON — styles.css
   Deep space luxury dark theme
═══════════════════════════════════════════ */

/* ── TOKENS ── */
:root {
  --bg-void: #07070F;
  --bg-deep: #0C0C1A;
  --bg-card: #111128;
  --bg-card-hover: #161630;
  --bg-glass: rgba(17,17,40,0.7);
  --border: rgba(123,92,240,0.18);
  --border-bright: rgba(123,92,240,0.45);

  --purple: #7B5CF0;
  --purple-light: #9D84F5;
  --gold: #F0A500;
  --gold-light: #FFD166;
  --teal: #00D4C8;
  --star-white: #F0F0FF;
  --muted: #6B6B90;
  --muted-light: #9090B8;

  --font-display: 'Syne', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;

  --shadow-card: 0 8px 40px rgba(0,0,0,0.5);
  --shadow-glow-purple: 0 0 40px rgba(123,92,240,0.25);
  --shadow-glow-gold: 0 0 40px rgba(240,165,0,0.2);

  --transition-fast: 0.18s ease;
  --transition-med: 0.35s cubic-bezier(0.4,0,0.2,1);
  --transition-slow: 0.6s cubic-bezier(0.4,0,0.2,1);
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-void);
  color: var(--star-white);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button { cursor: pointer; border: none; font-family: var(--font-body); }

/* ── STAR CANVAS ── */
#starCanvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* ── NAV ── */
#mainNav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 2.5rem;
  background: rgba(7,7,15,0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  transition: var(--transition-med);
}
.nav-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  background: linear-gradient(135deg, var(--purple-light), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.nav-links a {
  font-size: 0.875rem;
  color: var(--muted-light);
  transition: color var(--transition-fast);
  font-weight: 500;
}
.nav-links a:hover { color: var(--star-white); }
.nav-cta {
  background: linear-gradient(135deg, var(--purple), #5B3DD0);
  color: #fff;
  padding: 0.55rem 1.4rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all var(--transition-fast);
  box-shadow: 0 0 20px rgba(123,92,240,0.3);
}
.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 30px rgba(123,92,240,0.5);
}

/* ── SECTIONS ── */
.section {
  position: relative;
  z-index: 1;
  display: none;
  min-height: 100vh;
  padding-top: 80px;
}
.section.active { display: block; }

/* ── BUTTONS ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--purple), #5B3DD0);
  color: #fff;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all var(--transition-fast);
  box-shadow: 0 0 30px rgba(123,92,240,0.3);
  border: 1px solid rgba(123,92,240,0.4);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 45px rgba(123,92,240,0.55);
}
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--muted-light);
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all var(--transition-fast);
}
.btn-ghost:hover {
  color: var(--star-white);
  border-color: var(--border-bright);
  background: rgba(123,92,240,0.08);
}

/* ── COMMON TYPOGRAPHY ── */
.gradient-text {
  background: linear-gradient(135deg, var(--purple-light) 0%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 0.75rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--star-white);
  margin-bottom: 1rem;
}

/* ═══════════════════════
   HOME SECTION
═══════════════════════ */
.hero-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem 2rem;
  text-align: center;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 0.4rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}
.pulse-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 8px var(--teal);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.5; transform:scale(1.4); }
}
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.hero-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--muted-light);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}
.hero-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

/* ── HERO VISUAL ── */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}
.hero-card {
  position: relative;
  width: 220px;
  height: 240px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-med), border-color var(--transition-med);
}
.hero-card:hover { transform: translateY(-6px); }
.hero-card-future { border-color: rgba(123,92,240,0.4); box-shadow: var(--shadow-glow-purple); }
.card-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.card-orbit {
  position: absolute;
  width: 160px; height: 160px;
  border: 1px dashed rgba(107,107,144,0.25);
  border-radius: 50%;
  top: 50%; left: 50%;
  transform: translate(-50%,-55%);
  animation: spin 18s linear infinite;
}
.future-orbit {
  border-color: rgba(123,92,240,0.3);
  animation: spin 12s linear infinite;
}
@keyframes spin { to { transform: translate(-50%,-55%) rotate(360deg); } }
.card-score {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--muted-light);
  position: relative;
  z-index: 1;
}
.card-sublabel {
  font-size: 0.75rem;
  color: var(--muted);
  position: relative;
  z-index: 1;
}
.hero-arrow-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.hero-arrow-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, var(--purple), var(--gold), transparent);
  opacity: 0.6;
}
.hero-arrow-chevron { opacity: 0.8; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

/* ── STATS ── */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 2rem 0 3rem;
  border-top: 1px solid var(--border);
}
.stat-item { text-align: center; }
.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--purple-light), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.2rem; }
.stat-divider { width: 1px; height: 40px; background: var(--border); }

/* ── FEATURES ── */
.features-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  text-align: left;
}
.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition-med);
  box-shadow: var(--shadow-card);
}
.feature-card:hover {
  border-color: var(--border-bright);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow-purple);
}
.feature-icon {
  font-size: 1.5rem;
  color: var(--purple-light);
  margin-bottom: 1rem;
  display: block;
}
.feature-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--star-white);
}
.feature-card p { font-size: 0.875rem; color: var(--muted-light); line-height: 1.6; }

/* ── TIERS ── */
.tiers-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
}
.tiers-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}
.tier-pill {
  padding: 0.55rem 1.3rem;
  border-radius: 50px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border: 1px solid currentColor;
  display: flex; align-items: center; gap: 0.5rem;
}
.tier-pill span { opacity: 0.6; font-weight: 400; }
.tier-drifter    { color:#6B6B90; border-color:rgba(107,107,144,0.4); background:rgba(107,107,144,0.08); }
.tier-wanderer   { color:#7EC8E3; border-color:rgba(126,200,227,0.4); background:rgba(126,200,227,0.08); }
.tier-builder    { color:#68D391; border-color:rgba(104,211,145,0.4); background:rgba(104,211,145,0.08); }
.tier-challenger { color:#F6AD55; border-color:rgba(246,173,85,0.4); background:rgba(246,173,85,0.08); }
.tier-elite      { color:#F687B3; border-color:rgba(246,135,179,0.4); background:rgba(246,135,179,0.08); }
.tier-visionary  { color:#9D84F5; border-color:rgba(157,132,245,0.4); background:rgba(157,132,245,0.08); }
.tier-legendary  { color:#F0A500; border-color:rgba(240,165,0,0.5); background:rgba(240,165,0,0.1); box-shadow:0 0 20px rgba(240,165,0,0.15); }

/* ── EMAIL ── */
.email-section {
  background: linear-gradient(135deg, rgba(123,92,240,0.06), rgba(0,212,200,0.04));
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 6rem 2rem;
}
.email-inner {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.email-desc { color: var(--muted-light); margin-bottom: 2rem; line-height: 1.7; }
.email-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.email-input {
  flex: 1;
  min-width: 240px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 0.85rem 1.5rem;
  color: var(--star-white);
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition-fast);
}
.email-input:focus { border-color: var(--purple); }
.email-input::placeholder { color: var(--muted); }
.email-fine { font-size: 0.75rem; color: var(--muted); margin-top: 1rem; }

/* ═══════════════════════
   SIMULATOR
═══════════════════════ */
.sim-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}
.sim-header {
  text-align: center;
  margin-bottom: 3rem;
}
.sim-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.25em;
  background: linear-gradient(135deg, var(--purple-light), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
}
.sim-progress-wrap {
  height: 3px;
  background: rgba(123,92,240,0.15);
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}
.sim-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--purple), var(--gold));
  border-radius: 50px;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  width: 0%;
}
.sim-step-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.sim-question-area {
  flex: 1;
  animation: fadeSlide 0.4s ease;
}
@keyframes fadeSlide {
  from { opacity:0; transform:translateY(18px); }
  to   { opacity:1; transform:translateY(0); }
}
.sim-q-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--purple-light);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.sim-q-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--star-white);
  margin-bottom: 0.5rem;
}
.sim-q-sub {
  font-size: 0.9rem;
  color: var(--muted-light);
  margin-bottom: 2.5rem;
}

/* Option Grid */
.sim-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.sim-options.single-col { grid-template-columns: 1fr; }
.sim-option {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.4rem;
  color: var(--muted-light);
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}
.sim-option::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--purple), transparent);
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.sim-option:hover {
  border-color: var(--border-bright);
  color: var(--star-white);
}
.sim-option.selected {
  border-color: var(--purple);
  color: var(--star-white);
  background: rgba(123,92,240,0.15);
  box-shadow: 0 0 20px rgba(123,92,240,0.2);
}
.sim-option.selected::before { opacity: 0.05; }
.opt-icon { font-size: 1.2rem; margin-bottom: 0.4rem; display: block; }
.opt-label { font-weight: 600; display: block; }
.opt-desc { font-size: 0.78rem; color: var(--muted); margin-top: 0.2rem; display: block; }

/* Slider */
.sim-slider-wrap { margin: 2rem 0; }
.sim-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 50px;
  background: rgba(123,92,240,0.15);
  outline: none;
  margin-bottom: 1rem;
}
.sim-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--gold));
  cursor: pointer;
  box-shadow: 0 0 12px rgba(123,92,240,0.5);
  border: 2px solid #fff;
}
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--muted);
}
.slider-val {
  text-align: center;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--purple-light), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Text Input */
.sim-text-input {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.4rem;
  color: var(--star-white);
  font-family: var(--font-body);
  font-size: 1rem;
  outline: none;
  transition: border-color var(--transition-fast);
  margin-bottom: 0.5rem;
}
.sim-text-input:focus { border-color: var(--purple); box-shadow: 0 0 20px rgba(123,92,240,0.15); }

.sim-nav-row {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
  align-items: center;
}

/* ═══════════════════════
   CALCULATING
═══════════════════════ */
.calc-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  gap: 3rem;
  padding: 2rem;
}
.calc-orb {
  width: 180px; height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, var(--purple-light), var(--purple), #2A0A8A);
  box-shadow: 0 0 80px rgba(123,92,240,0.6), 0 0 160px rgba(123,92,240,0.2);
  animation: orbPulse 2s ease-in-out infinite;
}
@keyframes orbPulse {
  0%,100% { transform:scale(1); box-shadow:0 0 80px rgba(123,92,240,0.6),0 0 160px rgba(123,92,240,0.2); }
  50% { transform:scale(1.08); box-shadow:0 0 120px rgba(123,92,240,0.8),0 0 200px rgba(123,92,240,0.3); }
}
.calc-text-stack { width: 100%; max-width: 420px; text-align: center; }
.calc-label {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--muted-light);
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}
.calc-bar-outer {
  height: 4px;
  background: rgba(123,92,240,0.15);
  border-radius: 50px;
  overflow: hidden;
}
.calc-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--purple), var(--gold), var(--teal));
  border-radius: 50px;
  transition: width 0.3s ease;
}

/* ═══════════════════════
   RESULTS
═══════════════════════ */
.results-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
}

/* Score Hero */
.result-score-hero {
  text-align: center;
  padding: 4rem 2rem 3rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
}
.result-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 1rem;
}
.result-big-score {
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--purple-light) 0%, var(--gold) 60%, var(--teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: scoreReveal 1s cubic-bezier(0.4,0,0.2,1) forwards;
}
@keyframes scoreReveal {
  from { opacity:0; transform:scale(0.7) translateY(20px); filter:blur(8px); }
  to   { opacity:1; transform:scale(1) translateY(0); filter:blur(0); }
}
.result-tier-badge {
  display: inline-block;
  padding: 0.5rem 2rem;
  border-radius: 50px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 1rem 0;
}
.result-archetype-label {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--star-white);
  margin-bottom: 0.5rem;
}
.result-archetype-desc {
  font-size: 0.95rem;
  color: var(--muted-light);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Result Grid */
.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.result-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-med), border-color var(--transition-med);
}
.result-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-bright);
}
.result-card-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 1.2rem;
}
.result-card-full { grid-column: 1 / -1; }

/* Metric Rows */
.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(123,92,240,0.08);
}
.metric-row:last-child { border-bottom: none; }
.metric-name { font-size: 0.875rem; color: var(--muted-light); }
.metric-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--star-white);
}

/* Progress bars in results */
.result-bar-wrap { margin: 0.8rem 0; }
.result-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted-light);
  margin-bottom: 0.4rem;
}
.result-bar-label span:last-child {
  font-family: var(--font-mono);
  color: var(--star-white);
  font-weight: 600;
}
.result-bar-outer {
  height: 5px;
  background: rgba(123,92,240,0.1);
  border-radius: 50px;
  overflow: hidden;
}
.result-bar-fill {
  height: 100%;
  border-radius: 50px;
  width: 0;
  animation: barGrow 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
  animation-delay: 0.3s;
}
@keyframes barGrow { to { width: var(--target-width, 0%); } }
.bar-purple { background: linear-gradient(90deg, var(--purple), var(--purple-light)); }
.bar-gold   { background: linear-gradient(90deg, #C07A00, var(--gold)); }
.bar-teal   { background: linear-gradient(90deg, #007C78, var(--teal)); }
.bar-pink   { background: linear-gradient(90deg, #C0186A, #F687B3); }

/* Charts */
.chart-wrap { position: relative; height: 280px; }
canvas.result-chart { max-width: 100%; }

/* Outlook Cards */
.outlook-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-top: 1.2rem;
}
.outlook-card {
  background: rgba(123,92,240,0.06);
  border: 1px solid rgba(123,92,240,0.18);
  border-radius: var(--radius-md);
  padding: 1.4rem;
}
.outlook-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--purple-light);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}
.outlook-text { font-size: 0.875rem; color: var(--muted-light); line-height: 1.6; }

/* Roadmap */
.roadmap-list { list-style: none; }
.roadmap-item {
  display: flex;
  gap: 1.2rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(123,92,240,0.08);
}
.roadmap-item:last-child { border-bottom: none; }
.roadmap-num {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--gold));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  color: #fff;
}
.roadmap-text { font-size: 0.875rem; color: var(--muted-light); line-height: 1.6; }
.roadmap-text strong { color: var(--star-white); font-weight: 600; }

/* Highlight Insights */
.insight-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.insight-cell {
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.3rem;
}
.insight-cell.highlight { border-color: rgba(240,165,0,0.35); background: rgba(240,165,0,0.05); }
.insight-cell.danger    { border-color: rgba(248,113,113,0.35); background: rgba(248,113,113,0.05); }
.insight-type {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.4rem;
}
.insight-value { font-size: 0.95rem; font-weight: 600; color: var(--star-white); line-height: 1.4; }

/* Resources */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin-top: 1.2rem;
}
.resource-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.4rem;
  transition: all var(--transition-fast);
}
.resource-card:hover {
  border-color: var(--border-bright);
  transform: translateY(-2px);
}
.resource-type {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 0.5rem;
}
.resource-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
.resource-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }

/* CTA Row */
.result-cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 3rem;
  justify-content: center;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
}

/* ═══════════════════════
   LEADERBOARD
═══════════════════════ */
.leaderboard-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  text-align: center;
}
.leaderboard-desc { color: var(--muted-light); margin-bottom: 3rem; }
.lb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  text-align: left;
}
.lb-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}
.lb-card-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--purple-light);
  margin-bottom: 1.5rem;
}
.lb-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(123,92,240,0.08);
}
.lb-row:last-child { border-bottom: none; }
.lb-rank {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}
.lb-rank.top3 {
  color: var(--gold);
  font-weight: 700;
}
.lb-name { flex: 1; font-size: 0.9rem; color: var(--star-white); }
.lb-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--purple-light);
}

/* ═══════════════════════
   SHARE MODAL
═══════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--bg-deep);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8), var(--shadow-glow-purple);
  animation: modalIn 0.35s cubic-bezier(0.4,0,0.2,1);
}
@keyframes modalIn {
  from { opacity:0; transform:scale(0.9) translateY(20px); }
  to   { opacity:1; transform:scale(1) translateY(0); }
}
.modal-close {
  position: absolute;
  top: 1.2rem; right: 1.2rem;
  background: transparent;
  color: var(--muted);
  font-size: 1rem;
  transition: color var(--transition-fast);
}
.modal-close:hover { color: var(--star-white); }
.modal-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Share Card */
.share-card-preview {
  background: linear-gradient(135deg, var(--bg-void) 0%, #120D2A 50%, #0A1A1A 100%);
  border: 1px solid rgba(123,92,240,0.35);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.share-card-preview::before {
  content: '';
  position: absolute;
  top: -50px; right: -50px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(123,92,240,0.15), transparent 70%);
  border-radius: 50%;
}
.share-card-logo {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--muted);
  margin-bottom: 1.2rem;
}
.share-card-score-num {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--purple-light), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.3rem;
}
.share-card-tier-text {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--purple-light);
  margin-bottom: 0.5rem;
}
.share-card-arch {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--star-white);
  margin-bottom: 1.2rem;
}
.share-card-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
.share-stat { color: var(--muted-light); }
.share-stat span { color: var(--star-white); font-weight: 700; }
.share-card-url {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--muted);
  margin-top: 1rem;
  letter-spacing: 0.08em;
}

/* Share Buttons */
.share-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.share-btn {
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  transition: all var(--transition-fast);
  border: 1px solid transparent;
}
.share-x  { background: rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.15); color: #fff; }
.share-li { background: rgba(0,119,181,0.2); border-color: rgba(0,119,181,0.4); color: #60B3E6; }
.share-wa { background: rgba(37,211,102,0.1); border-color: rgba(37,211,102,0.3); color: #25D366; }
.share-copy{ background: rgba(123,92,240,0.15); border-color: rgba(123,92,240,0.4); color: var(--purple-light); }
.share-btn:hover { transform: translateY(-2px); filter: brightness(1.15); }

/* ═══════════════════════
   TOAST
═══════════════════════ */
#toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: var(--bg-card);
  border: 1px solid var(--border-bright);
  border-radius: 50px;
  padding: 0.75rem 1.8rem;
  font-size: 0.875rem;
  color: var(--star-white);
  z-index: 9999;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  white-space: nowrap;
  box-shadow: var(--shadow-glow-purple);
}
#toast.visible { transform: translateX(-50%) translateY(0); }

/* ═══════════════════════
   RESPONSIVE
═══════════════════════ */
@media (max-width: 768px) {
  #mainNav { padding: 1rem 1.25rem; }
  .nav-links a { display: none; }
  .hero-visual { gap: 1rem; }
  .hero-card { width: 160px; height: 180px; }
  .card-score { font-size: 2.5rem; }
  .hero-arrow-line { height: 40px; }
  .stats-row { gap: 1.5rem; }
  .stat-divider { display: none; }
  .sim-options { grid-template-columns: 1fr; }
  .outlook-grid { grid-template-columns: 1fr; }
  .share-buttons { grid-template-columns: 1fr 1fr; }
  .result-cta-row { justify-content: stretch; }
  .result-cta-row button { flex: 1; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

.hide-mobile { display: inline; }
@media (max-width: 600px) { .hide-mobile { display: none; } }
