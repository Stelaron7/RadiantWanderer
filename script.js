/* ═══════════════════════════════════════════
   STELARON — script.js
   Full simulator engine, scoring, results
═══════════════════════════════════════════ */

/* ── STAR CANVAS ── */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], mouse = { x: 0, y: 0 };
  const STAR_COUNT = 180;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.7 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,180,255,${alpha})`;
      ctx.fill();
      s.y -= s.speed;
      if (s.y < -2) { Object.assign(s, createStar(), { y: H + 2 }); }
    });
    // subtle mouse nebula
    const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
    grd.addColorStop(0, 'rgba(123,92,240,0.03)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  init();
  draw();
})();

/* ── SECTION NAVIGATION ── */
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(name + 'Section').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'leaderboard') populateLeaderboard();
}

/* ── TOAST ── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 2800);
}

/* ══════════════════════════════════════════
   SIMULATOR ENGINE
══════════════════════════════════════════ */

const QUESTIONS = [
  {
    id: 'age',
    label: 'About You',
    title: 'How old are you?',
    sub: 'Your stage of life shapes your potential trajectory.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'under18',  icon: '🌱', label: 'Under 18',    desc: 'Early stage' },
      { value: '18_24',    icon: '⚡', label: '18–24',       desc: 'Launch window' },
      { value: '25_34',    icon: '🔥', label: '25–34',       desc: 'Prime decade' },
      { value: '35_44',    icon: '🏗️', label: '35–44',       desc: 'Building years' },
      { value: '45_54',    icon: '🎯', label: '45–54',       desc: 'Leverage phase' },
      { value: '55plus',   icon: '👑', label: '55+',         desc: 'Wisdom tier' },
    ],
  },
  {
    id: 'status',
    label: 'Current Status',
    title: 'What's your primary role right now?',
    sub: 'Your current environment shapes your growth runway.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'student',     icon: '📚', label: 'Student',         desc: 'Learning mode' },
      { value: 'employed',    icon: '💼', label: 'Employed',        desc: 'Working for others' },
      { value: 'founder',     icon: '🚀', label: 'Founder / Self-employed', desc: 'Building your own' },
      { value: 'freelancer',  icon: '🎯', label: 'Freelancer',      desc: 'Independent operator' },
      { value: 'between',     icon: '🌀', label: 'Between things',  desc: 'In transition' },
    ],
  },
  {
    id: 'income',
    label: 'Current Reality',
    title: 'What is your approximate annual income?',
    sub: 'This helps calibrate your current position.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'none',    icon: '—',  label: 'None / Student',  desc: 'Pre-income' },
      { value: 'low',     icon: '📈', label: 'Under $20K',      desc: 'Starting out' },
      { value: 'mid_low', icon: '💰', label: '$20K–$50K',       desc: 'Building base' },
      { value: 'mid',     icon: '💵', label: '$50K–$100K',      desc: 'Solid foundation' },
      { value: 'high',    icon: '🔥', label: '$100K–$250K',     desc: 'High performer' },
      { value: 'elite',   icon: '👑', label: '$250K+',          desc: 'Top earner' },
    ],
  },
  {
    id: 'desiredIncome',
    label: 'Ambition',
    title: 'What income level do you aspire to reach?',
    sub: 'Your ceiling ambition directly impacts your trajectory score.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'comfortable',   icon: '🏡', label: '$50K–$100K',    desc: 'Comfortable life' },
      { value: 'professional',  icon: '🏆', label: '$100K–$250K',   desc: 'High professional' },
      { value: 'affluent',      icon: '💎', label: '$250K–$1M',     desc: 'Affluent tier' },
      { value: 'millionaire',   icon: '🚀', label: '$1M–$10M',      desc: 'Millionaire track' },
      { value: 'multi_millionaire', icon: '🌍', label: '$10M+',     desc: 'Wealth builder' },
    ],
  },
  {
    id: 'screenTime',
    label: 'Time Audit',
    title: 'How many hours per day do you spend on mindless screen time?',
    sub: 'Social media, news, passive entertainment.',
    type: 'slider',
    min: 0, max: 12, step: 0.5, defaultVal: 4,
    unit: 'hrs/day',
    minLabel: '0h', maxLabel: '12h+',
  },
  {
    id: 'learningHours',
    label: 'Growth Investment',
    title: 'How many hours per week do you spend actively learning?',
    sub: 'Reading, courses, skill development, studying.',
    type: 'slider',
    min: 0, max: 40, step: 1, defaultVal: 5,
    unit: 'hrs/week',
    minLabel: '0h', maxLabel: '40h',
  },
  {
    id: 'ambition',
    label: 'Mindset',
    title: 'How would you rate your raw ambition?',
    sub: 'Your honest desire to achieve something significant.',
    type: 'options',
    cols: 2,
    options: [
      { value: 1, icon: '😴', label: 'Low',      desc: 'Content with average' },
      { value: 2, icon: '😐', label: 'Moderate', desc: 'Some desire to grow' },
      { value: 3, icon: '💪', label: 'High',      desc: 'Strong drive to succeed' },
      { value: 4, icon: '🔥', label: 'Extreme',  desc: 'Obsessive about achieving' },
    ],
  },
  {
    id: 'discipline',
    label: 'Execution',
    title: 'How disciplined are you with your habits?',
    sub: 'Your ability to do hard things consistently when you don't feel like it.',
    type: 'options',
    cols: 2,
    options: [
      { value: 1, icon: '🌀', label: 'Inconsistent', desc: 'Often breaks routines' },
      { value: 2, icon: '🎯', label: 'Developing',   desc: 'Working on it' },
      { value: 3, icon: '⚡', label: 'Solid',        desc: 'Usually follows through' },
      { value: 4, icon: '🏆', label: 'Elite',        desc: 'Rarely breaks commitments' },
    ],
  },
  {
    id: 'bigGoal',
    label: 'Vision',
    title: 'What is your biggest goal right now?',
    sub: 'The one thing you're most actively building toward.',
    type: 'text',
    placeholder: 'e.g. Build a SaaS to $10K MRR, become a senior engineer, write a book...',
  },
  {
    id: 'primarySkill',
    label: 'Core Asset',
    title: 'What is your most developed skill or domain?',
    sub: 'Your primary vehicle for creating value in the world.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'tech',       icon: '💻', label: 'Tech / Engineering', desc: 'Code, systems, data' },
      { value: 'business',   icon: '📊', label: 'Business / Strategy', desc: 'Ops, growth, finance' },
      { value: 'creative',   icon: '🎨', label: 'Creative / Design',  desc: 'Art, content, UX' },
      { value: 'sales',      icon: '🤝', label: 'Sales / Marketing',  desc: 'Persuasion, growth' },
      { value: 'leadership', icon: '🏛️', label: 'Leadership / People', desc: 'Managing, building teams' },
      { value: 'science',    icon: '🔬', label: 'Science / Research',  desc: 'Analysis, discovery' },
    ],
  },
  {
    id: 'timeHorizon',
    label: 'Time Perspective',
    title: 'How far into the future do you actively plan?',
    sub: 'Long-range thinking compounds your probability of success.',
    type: 'options',
    cols: 2,
    options: [
      { value: 'days',    icon: '📅', label: 'Days',    desc: 'Living in the present' },
      { value: 'months',  icon: '🗓️', label: 'Months',  desc: 'Short-term planner' },
      { value: 'year',    icon: '🎯', label: '1 Year',  desc: 'Annual thinker' },
      { value: 'years3',  icon: '🗺️', label: '3 Years', desc: 'Medium-term strategist' },
      { value: 'years5',  icon: '🔭', label: '5+ Years',desc: 'Long-range visionary' },
    ],
  },
];

let simStep = 0;
let simAnswers = {};
let simSliderVal = null;

function startSimulator() {
  simStep = 0;
  simAnswers = {};
  showSection('simulator');
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[simStep];
  const area = document.getElementById('simQuestionArea');
  const progress = ((simStep) / QUESTIONS.length) * 100;
  document.getElementById('simProgressBar').style.width = progress + '%';
  document.getElementById('simStepLabel').textContent = `Step ${simStep + 1} of ${QUESTIONS.length}`;
  document.getElementById('simBackBtn').style.display = simStep > 0 ? 'inline-flex' : 'none';

  let html = `<div class="sim-q-label">${q.label}</div>
              <h2 class="sim-q-title">${q.title}</h2>
              <p class="sim-q-sub">${q.sub}</p>`;

  if (q.type === 'options') {
    const cols = (q.options.length <= 3 || q.cols === 1) ? 'single-col' : '';
    html += `<div class="sim-options ${cols}">`;
    q.options.forEach(opt => {
      const sel = simAnswers[q.id] === opt.value ? 'selected' : '';
      html += `<button class="sim-option ${sel}" data-val="${opt.value}" onclick="selectOption('${q.id}', '${opt.value}', this)">
                 <span class="opt-icon">${opt.icon}</span>
                 <span class="opt-label">${opt.label}</span>
                 <span class="opt-desc">${opt.desc}</span>
               </button>`;
    });
    html += `</div>`;
  } else if (q.type === 'slider') {
    const current = simAnswers[q.id] !== undefined ? simAnswers[q.id] : q.defaultVal;
    simSliderVal = current;
    html += `<div class="sim-slider-wrap">
               <div class="slider-val" id="sliderDisplay">${current} ${q.unit}</div>
               <input type="range" class="sim-slider" id="simSlider"
                      min="${q.min}" max="${q.max}" step="${q.step}" value="${current}"
                      oninput="updateSlider(this.value, '${q.unit}')" />
               <div class="slider-labels"><span>${q.minLabel}</span><span>${q.maxLabel}</span></div>
             </div>`;
  } else if (q.type === 'text') {
    const val = simAnswers[q.id] || '';
    html += `<input type="text" class="sim-text-input" id="textInput"
                    placeholder="${q.placeholder}" value="${val}"
                    oninput="simAnswers['${q.id}']=this.value" />`;
  }

  area.innerHTML = html;
  area.style.animation = 'none';
  void area.offsetWidth;
  area.style.animation = 'fadeSlide 0.4s ease';
}

function selectOption(qId, val, el) {
  simAnswers[qId] = typeof val === 'string' && !isNaN(val) ? Number(val) : val;
  document.querySelectorAll('.sim-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function updateSlider(val, unit) {
  simSliderVal = parseFloat(val);
  document.getElementById('sliderDisplay').textContent = `${val} ${unit}`;
}

function simBack() {
  if (simStep > 0) { simStep--; renderQuestion(); }
}

function simNext() {
  const q = QUESTIONS[simStep];

  // Save slider
  if (q.type === 'slider') {
    const el = document.getElementById('simSlider');
    simAnswers[q.id] = el ? parseFloat(el.value) : q.defaultVal;
  }
  // Validate text
  if (q.type === 'text') {
    const el = document.getElementById('textInput');
    if (el) simAnswers[q.id] = el.value.trim() || 'Build something meaningful';
  }
  // Validate options
  if (q.type === 'options' && simAnswers[q.id] === undefined) {
    showToast('Please choose an option to continue');
    return;
  }

  simStep++;
  if (simStep >= QUESTIONS.length) {
    startCalculation();
  } else {
    renderQuestion();
  }
}

/* ══════════════════════════════════════════
   CALCULATION PHASE
══════════════════════════════════════════ */
const CALC_MESSAGES = [
  'Mapping your input patterns...',
  'Calculating discipline coefficient...',
  'Projecting 5-year trajectory...',
  'Identifying leverage opportunities...',
  'Assigning your archetype...',
  'Generating your Future Report...',
];

function startCalculation() {
  showSection('calculating');
  let progress = 0;
  let msgIdx = 0;
  const bar = document.getElementById('calcBarFill');
  const label = document.getElementById('calcLabel');

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    if (msgIdx < CALC_MESSAGES.length - 1 && progress > (msgIdx + 1) * 16) {
      msgIdx++;
      label.style.opacity = '0';
      setTimeout(() => {
        label.textContent = CALC_MESSAGES[msgIdx];
        label.style.opacity = '1';
      }, 200);
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        const result = computeResult(simAnswers);
        renderResults(result);
        showSection('results');
      }, 600);
    }
  }, 260);
}

/* ══════════════════════════════════════════
   SCORING ENGINE
══════════════════════════════════════════ */
function computeResult(a) {
  let score = 0;

  // Age modifier (peak building years score higher)
  const ageMap = { under18: 5, '18_24': 10, '25_34': 9, '35_44': 7, '45_54': 6, '55plus': 5 };
  score += (ageMap[a.age] || 7);

  // Status modifier
  const statusMap = { student: 7, employed: 6, founder: 10, freelancer: 9, between: 4 };
  score += (statusMap[a.status] || 6);

  // Income gap (high aspirations + current income relative gap)
  const incomeScore = { none: 1, low: 2, mid_low: 4, mid: 6, high: 8, elite: 10 };
  const desiredScore = { comfortable: 4, professional: 6, affluent: 8, millionaire: 9, multi_millionaire: 10 };
  const iScore = incomeScore[a.income] || 3;
  const dScore = desiredScore[a.desiredIncome] || 6;
  // Gap penalty/boost: high ambition beyond current reality = good
  const gap = dScore - iScore;
  score += iScore * 0.8 + Math.max(0, gap) * 0.9;

  // Screen time penalty (0h = no penalty, 12h = max penalty)
  const screenPenalty = Math.min(a.screenTime || 0, 12) * 0.9;
  score -= screenPenalty;

  // Learning hours bonus
  const learnBonus = Math.min(a.learningHours || 0, 40) * 0.55;
  score += learnBonus;

  // Ambition (1–4 → linear scale)
  score += (a.ambition || 1) * 3.5;

  // Discipline (1–4 → heavier weight)
  score += (a.discipline || 1) * 5;

  // Time horizon
  const horizonMap = { days: 0, months: 2, year: 4, years3: 7, years5: 10 };
  score += (horizonMap[a.timeHorizon] || 3);

  // Skill bonus
  const skillBonus = { tech: 8, business: 8, sales: 7, creative: 6, leadership: 7, science: 7 };
  score += (skillBonus[a.primarySkill] || 6);

  // Normalize 0–100
  const RAW_MIN = 0;
  const RAW_MAX = 110;
  score = Math.max(0, Math.min(100, Math.round(((score - RAW_MIN) / (RAW_MAX - RAW_MIN)) * 100)));

  // Sub-scores
  const disciplineRating = Math.min(100, Math.round((a.discipline || 1) / 4 * 100));
  const ambitionRating   = Math.min(100, Math.round((a.ambition || 1) / 4 * 100));
  const focusRating      = Math.min(100, Math.round(Math.max(0, 100 - (a.screenTime || 0) * 7)));
  const executionRating  = Math.min(100, Math.round(
    (((a.discipline || 1) / 4 * 0.5) + ((a.learningHours || 0) / 40 * 0.5)) * 100
  ));
  const skillGrowth      = Math.min(100, Math.round((a.learningHours || 0) / 40 * 100));
  const wealthPotential  = Math.min(100, Math.round(
    (dScore / 10 * 60) + (iScore / 10 * 20) + ((a.ambition || 1) / 4 * 20)
  ));

  const tier        = getTier(score);
  const archetype   = getArchetype(a, score);
  const riskLevel   = getRiskLevel(a);
  const careerVel   = getCareerVelocity(a, score);
  const wealthLabel = getWealthLabel(wealthPotential);
  const topAction   = getTopAction(a, score);

  return {
    score, tier, archetype, disciplineRating, ambitionRating,
    focusRating, executionRating, skillGrowth, wealthPotential,
    riskLevel, careerVel, wealthLabel, topAction,
    answers: a,
    outlook12: get12MonthOutlook(a, score, tier),
    outlook5: get5YearOutlook(a, score, tier),
    strengths: getStrengths(a, score, tier),
    weakness: getWeakness(a, score),
    opportunity: getOpportunity(a, score),
    risk: getRisk(a, score),
    bottleneck: getBottleneck(a, score),
    roadmap: getRoadmap(a, score, tier),
    resources: getResources(a),
  };
}

function getTier(score) {
  if (score <= 20) return { name: 'DRIFTER',    color: '#6B6B90', meaning: 'You\'re moving without clear direction. Your potential is largely untapped and patterns need to change.' };
  if (score <= 40) return { name: 'WANDERER',   color: '#7EC8E3', meaning: 'You have ambition but lack consistency. You\'re searching for the right system.' };
  if (score <= 60) return { name: 'BUILDER',    color: '#68D391', meaning: 'You\'re laying foundations. The habits and skills you\'re building now will compound.' };
  if (score <= 75) return { name: 'CHALLENGER', color: '#F6AD55', meaning: 'You\'re actively competing and growing. A few critical upgrades will accelerate you.' };
  if (score <= 85) return { name: 'ELITE',      color: '#F687B3', meaning: 'You\'re in the top tier of focused individuals. Execution and leverage are your next frontiers.' };
  if (score <= 95) return { name: 'VISIONARY',  color: '#9D84F5', meaning: 'You operate at a level most people never reach. Your consistency and thinking set you apart.' };
  return              { name: 'LEGENDARY',   color: '#F0A500', meaning: 'You have an extraordinary profile. The question is no longer if — it\'s how big.' };
}

function getArchetype(a, score) {
  const skill = a.primarySkill;
  const status = a.status;
  const ambition = a.ambition || 1;
  const discipline = a.discipline || 1;

  if (status === 'founder' && ambition >= 3)            return archetypeData('The Founder');
  if (skill === 'tech' && discipline >= 3)              return archetypeData('The Architect');
  if (skill === 'business' && ambition >= 3)            return archetypeData('The Strategist');
  if (skill === 'leadership' && score >= 65)            return archetypeData('The Commander');
  if (status === 'employed' && discipline >= 3)         return archetypeData('The Operator');
  if (skill === 'creative' && ambition >= 3)            return archetypeData('The Creator');
  if (skill === 'science' && discipline >= 3)           return archetypeData('The Innovator');
  if (score >= 80 && ambition >= 4)                     return archetypeData('The Visionary');
  if (score >= 90)                                      return archetypeData('The Titan');
  if (skill === 'sales')                                return archetypeData('The Builder');
  return archetypeData('The Explorer');
}

function archetypeData(name) {
  const map = {
    'The Founder': {
      name, desc: 'You are wired to build from scratch. You see gaps others ignore and have the nerve to fill them.',
      strengths: 'Vision, risk tolerance, problem-solving under pressure.',
      weakness: 'Can neglect execution details and burn out from doing everything.',
      path: 'Focus on leverage: hire before you\'re ready, systematize before you scale.',
    },
    'The Architect': {
      name, desc: 'You build systems that outlast your direct involvement. Code, infrastructure, and elegant design are your medium.',
      strengths: 'Deep thinking, precision, scalable output.',
      weakness: 'May undervalue communication and overvalue perfect solutions.',
      path: 'Move from individual contributor to technical leader. Your leverage multiplies with every person you enable.',
    },
    'The Strategist': {
      name, desc: 'You see the chess board five moves ahead. You optimize, allocate, and architect decisions.',
      strengths: 'Analytical thinking, resource allocation, pattern recognition.',
      weakness: 'Tendency to plan without executing. Analysis paralysis is your nemesis.',
      path: 'Partner with high-execution operators. Your value compounds when your strategy gets implemented.',
    },
    'The Commander': {
      name, desc: 'You multiply through others. Your leadership turns potential into performance.',
      strengths: 'Influence, clarity under pressure, inspiring action.',
      weakness: 'Can over-rely on authority and neglect technical depth.',
      path: 'Build your own organization or division. Your ceiling is set by the quality of people you attract.',
    },
    'The Operator': {
      name, desc: 'You are the engine inside the machine. Systems run better because of you.',
      strengths: 'Reliability, process mastery, high-quality output.',
      weakness: 'Can become invisible — doing excellent work that others take credit for.',
      path: 'Document your impact quantitatively. Make your value undeniable, then negotiate aggressively.',
    },
    'The Creator': {
      name, desc: 'You produce work that resonates, moves, and sticks. The world needs your output.',
      strengths: 'Originality, audience connection, emotional intelligence.',
      weakness: 'May resist monetization or undervalue your own work commercially.',
      path: 'Build an owned audience. Creators with distribution have unlimited leverage.',
    },
    'The Innovator': {
      name, desc: 'You operate at the frontier of what\'s known. Curiosity is your competitive advantage.',
      strengths: 'First-principles thinking, discovery, solving novel problems.',
      weakness: 'May pursue novelty at the expense of completion.',
      path: 'Find the applied context where your research meets real demand. That intersection is worth enormous value.',
    },
    'The Explorer': {
      name, desc: 'You are in the most important phase: discovering what you\'re truly built for.',
      strengths: 'Adaptability, breadth of exposure, unconventional thinking.',
      weakness: 'Lack of compounding in a single domain. Breadth without depth is expensive.',
      path: 'Run 90-day experiments in high-leverage domains. The goal is to find your one thing — then go all in.',
    },
    'The Builder': {
      name, desc: 'You create tangible things — pipelines, relationships, products, and revenue.',
      strengths: 'Execution, persuasion, relationship capital.',
      weakness: 'May optimize for visible wins over long-term compounding value.',
      path: 'Build equity, not just income. Every dollar you earn should be building something that pays without you.',
    },
    'The Visionary': {
      name, desc: 'You see what\'s coming before others do, and you have the discipline to position accordingly.',
      strengths: 'Long-range thinking, pattern spotting, inspiring others toward a future.',
      weakness: 'Can struggle communicating vision to those who need concrete steps.',
      path: 'Build the platform — company, fund, movement — that makes your vision real at scale.',
    },
    'The Titan': {
      name, desc: 'You have the rare combination: clarity of vision, iron discipline, and relentless execution.',
      strengths: 'Almost everything. Your edge is compounding mastery.',
      weakness: 'Risk of isolation at the top. Systems and people need to scale with you.',
      path: 'Your next level is institutional. Build legacy systems, organizations, or ideas that outlive your direct involvement.',
    },
  };
  return map[name] || map['The Explorer'];
}

function getRiskLevel(a) {
  const screenDrain = (a.screenTime || 0) > 5;
  const lowLearn = (a.learningHours || 0) < 3;
  const lowDiscipline = (a.discipline || 1) <= 1;
  const shortSight = a.timeHorizon === 'days' || a.timeHorizon === 'months';
  const risks = [screenDrain, lowLearn, lowDiscipline, shortSight].filter(Boolean).length;
  if (risks >= 3) return 'HIGH';
  if (risks === 2) return 'MODERATE';
  if (risks === 1) return 'LOW';
  return 'MINIMAL';
}

function getCareerVelocity(a, score) {
  if (score >= 85) return 'VERY HIGH';
  if (score >= 70) return 'HIGH';
  if (score >= 50) return 'MODERATE';
  if (score >= 30) return 'LOW';
  return 'STALLED';
}

function getWealthLabel(wp) {
  if (wp >= 85) return 'VERY HIGH';
  if (wp >= 65) return 'HIGH';
  if (wp >= 45) return 'MODERATE';
  if (wp >= 25) return 'DEVELOPING';
  return 'EARLY STAGE';
}

function getTopAction(a, score) {
  if ((a.screenTime || 0) > 5) return 'Cut passive screen time by 60% — this single change will free cognitive bandwidth immediately.';
  if ((a.learningHours || 0) < 5) return 'Commit to 1 hour of deep learning daily — this compounds faster than almost any other action.';
  if ((a.discipline || 1) <= 2) return 'Install a non-negotiable morning system — your discipline is your most underdeveloped asset.';
  if (a.timeHorizon === 'days' || a.timeHorizon === 'months') return 'Write a 3-year vision document — upgrading your time horizon will immediately change your decisions.';
  if (score < 50) return 'Identify your one highest-leverage skill and commit to 6 months of focused development.';
  if (score < 70) return 'Find a mentor operating 5 years ahead of where you want to be — proximity is the fastest accelerant.';
  if (score < 85) return 'Build an income stream that doesn\'t require your direct time — your next level requires passive leverage.';
  return 'Document and systematize everything you do well — your job now is to multiply your impact through others.';
}

function get12MonthOutlook(a, score, tier) {
  const name = tier.name;
  const paths = {
    DRIFTER:    'Without change, 12 months looks similar to today. With change — specifically screen time reduction and 1 new skill commitment — you could reach Builder tier.',
    WANDERER:   'If you install one consistent weekly system and raise learning hours to 7+, you\'re likely to see your first meaningful compounding results.',
    BUILDER:    'You\'re approaching an inflection point. In 12 months, if you increase discipline and raise your ceiling ambition, you\'ll enter Challenger tier with real momentum.',
    CHALLENGER: 'Your fundamentals are solid. The next 12 months hinge on one big bet — a project, role, or skill that separates you from the 60-75 range permanently.',
    ELITE:      'You\'re poised for a major output year. One focused project could generate exceptional results. Prioritize ruthlessly — your ceiling is leverage, not effort.',
    VISIONARY:  'Your next 12 months should create assets, not just income. If you\'re not building something that compounds, you\'re underutilizing your profile.',
    LEGENDARY:  'You\'re in rare territory. The question is scale and legacy. 12 months of focused institutional building could create lasting impact beyond yourself.',
  };
  return paths[name] || paths['BUILDER'];
}

function get5YearOutlook(a, score, tier) {
  const desired = a.desiredIncome;
  const name = tier.name;
  const paths = {
    DRIFTER:    'Five years from now, path diverges sharply based on the choices made in the next 6 months. The gap between who you could be and who you are will either close or widen dramatically.',
    WANDERER:   'If you find your direction in the next 12 months, five years is enough time to reach the top 20% of your field. The compounding math works in your favor if you start now.',
    BUILDER:    'At your current trajectory with consistent growth, five years puts you in a genuinely strong position — financial, professional, and personal. You will look back on this period as the foundation.',
    CHALLENGER: 'Five years of Challenger momentum builds significant leverage. You\'re likely to be in senior leadership, running your own thing, or deeply specialized in a high-demand domain.',
    ELITE:      'Five years in Elite tier — with intentional moves — typically produces top 5% outcomes. The question is what you\'re optimizing for. Your profile supports almost any destination.',
    VISIONARY:  'Five-year Visionaries typically cross into generational wealth or influence territory. Your profile suggests you\'ll be building something institutional.',
    LEGENDARY:  'Your five-year outlook is about magnitude and meaning. The fundamentals are in place. What gets built now could outlast the builder.',
  };
  return paths[name] || paths['BUILDER'];
}

function getStrengths(a, score, tier) {
  const strengths = [];
  if ((a.discipline || 1) >= 3) strengths.push('High Discipline');
  if ((a.ambition || 1) >= 3)   strengths.push('Strong Ambition');
  if ((a.learningHours || 0) >= 10) strengths.push('Active Learner');
  if (a.status === 'founder') strengths.push('Entrepreneurial Mindset');
  if (a.timeHorizon === 'years5' || a.timeHorizon === 'years3') strengths.push('Long-Range Thinking');
  if ((a.screenTime || 0) <= 2) strengths.push('Deep Focus Capacity');
  if (score >= 70) strengths.push('High Execution Profile');
  return strengths.length > 0 ? strengths.join(', ') : 'Potential for growth in multiple dimensions';
}

function getWeakness(a, score) {
  if ((a.screenTime || 0) > 6) return 'Excessive passive screen time is draining your cognitive fuel.';
  if ((a.learningHours || 0) < 3) return 'Insufficient learning investment — skills stagnate without active growth.';
  if ((a.discipline || 1) <= 1) return 'Low discipline means strong ideas rarely become consistent results.';
  if (a.timeHorizon === 'days') return 'Living in the short term prevents you from making the decisions that matter most.';
  if (score < 40) return 'Multiple patterns working against compounding simultaneously — priority is to stabilize one domain.';
  return 'Consistency between ambition and daily actions — the gap is closeable but requires intention.';
}

function getOpportunity(a, score) {
  if (a.status === 'student' && score > 50) return 'You have time leverage most professionals would pay anything for. Use it to build skills, reputation, or projects now.';
  if (a.primarySkill === 'tech' && score > 50) return 'AI-era technical skills are the highest-ROI investment. Double down on systems thinking and applied AI.';
  if (a.primarySkill === 'creative' && score > 50) return 'Distribution is now free. Build an owned audience around your work — the leverage is asymmetric.';
  if ((a.learningHours || 0) > 10) return 'Your learning investment gives you compounding knowledge advantage. Pair it with high-visibility projects.';
  if (score > 70) return 'Your profile qualifies for top-tier mentors, opportunities, and networks. Actively seek proximity to the best people in your domain.';
  return 'Identifying one skill to go deep on for 12 months will create an asymmetric advantage in a world of shallow generalists.';
}

function getRisk(a, score) {
  if ((a.screenTime || 0) > 7) return 'Attention fragmentation is compounding silently — every hour of passive consumption delays the version of yourself you\'re trying to become.';
  if ((a.discipline || 1) <= 1 && (a.ambition || 1) >= 3) return 'High ambition without discipline is motivation without an engine — most promising trajectories stall here.';
  if (a.timeHorizon === 'days' || a.timeHorizon === 'months') return 'Short time horizons create short decisions. You will optimize for now at the cost of later.';
  if (score > 70 && (a.learningHours || 0) < 5) return 'High performers who stop learning rapidly lose their edge in a fast-moving world. Your growth rate must match your ambition.';
  return 'Complacency is the silent threat at every tier — the habits that got you here will not get you to the next level.';
}

function getBottleneck(a, score) {
  const issues = [];
  if ((a.screenTime || 0) > 5)       issues.push({ weight: 3, msg: 'Screen time is consuming your highest-value cognitive hours' });
  if ((a.learningHours || 0) < 5)    issues.push({ weight: 2.5, msg: 'Learning rate is below the threshold needed for meaningful skill compounding' });
  if ((a.discipline || 1) <= 2)      issues.push({ weight: 3.5, msg: 'Inconsistent discipline makes all other strengths unreliable' });
  if (a.timeHorizon === 'days')      issues.push({ weight: 2, msg: 'Short time horizon leads to tactical decisions at the cost of strategic positioning' });
  if (issues.length === 0) return 'Your biggest bottleneck is scale — you\'ve built strong fundamentals, now execution speed and leverage become the constraint.';
  issues.sort((a, b) => b.weight - a.weight);
  return issues[0].msg;
}

function getRoadmap(a, score, tier) {
  const items = [];
  if ((a.screenTime || 0) > 4) {
    items.push({ title: 'Reclaim your attention', body: 'Cap daily passive screen time to 90 minutes. Install app blockers during deep work hours. This single change raises your effective cognitive capacity.' });
  }
  if ((a.learningHours || 0) < 7) {
    items.push({ title: 'Install a learning system', body: 'Commit to 1 focused hour daily on your primary skill domain. Books, courses, projects — deliberate practice, not passive consumption.' });
  }
  if ((a.discipline || 1) <= 2) {
    items.push({ title: 'Build your discipline stack', body: 'Start with one non-negotiable daily anchor habit. Morning pages, exercise, or a deep work block. Compound from there.' });
  }
  if (a.timeHorizon === 'days' || a.timeHorizon === 'months') {
    items.push({ title: 'Write your 3-year vision', body: 'Spend 2 hours writing exactly where you want to be in 36 months — financially, professionally, personally. Clarity of future direction changes daily decisions.' });
  }
  if (a.status !== 'founder' && score > 55) {
    items.push({ title: 'Build a parallel asset', body: 'Start building something outside your primary income: a side project, audience, or skill that creates equity, not just salary.' });
  }
  items.push({ title: 'Find your accelerant environment', body: 'Join or build a peer group operating 1 tier above your current level. Proximity to higher standards is the fastest upgrade money can\'t directly buy.' });
  items.push({ title: 'Retake in 30 days', body: 'Return to STELARON after implementing changes. Watch your score evolve. Track evidence of your own growth compounding.' });
  return items.slice(0, 5);
}

function getResources(a) {
  const skill = a.primarySkill;
  const base = [
    { type: 'Book', title: 'Atomic Habits', desc: 'The foundational framework for building systems that make discipline automatic.' },
    { type: 'Concept', title: 'The Leverage Equation', desc: 'Code, media, capital, and labor — the four mechanisms of infinite leverage in the modern economy.' },
    { type: 'Practice', title: 'Weekly Review System', desc: 'A structured Sunday session to audit your week, reset your priorities, and keep score of your own growth.' },
  ];
  const skillRes = {
    tech:       { type: 'Skill', title: 'Systems Thinking + AI', desc: 'The highest-leverage technical skill combination for the next decade. Think in systems, build with AI.' },
    business:   { type: 'Skill', title: 'Unit Economics Mastery', desc: 'Understanding LTV, CAC, and margins at a deep level separates great operators from everyone else.' },
    creative:   { type: 'Skill', title: 'Audience Architecture', desc: 'Building a distribution channel you own — newsletter, social graph, community — is the creative leverage multiplier.' },
    sales:      { type: 'Skill', title: 'Value Articulation', desc: 'The ability to explain exactly why you create value, in the buyer\'s language, is the highest-leverage sales skill.' },
    leadership: { type: 'Skill', title: 'Delegation + Trust Systems', desc: 'Leaders who can\'t delegate are limited to what they can personally do. Build systems for trusting others.' },
    science:    { type: 'Skill', title: 'Applied Research', desc: 'The gap between pure research and commercial application is enormous — and immensely valuable.' },
  };
  if (skillRes[skill]) base.unshift(skillRes[skill]);
  return base.slice(0, 4);
}

/* ══════════════════════════════════════════
   RENDER RESULTS
══════════════════════════════════════════ */
let resultData = null;
let radarChart = null, pieChart = null;

function renderResults(r) {
  resultData = r;
  const container = document.getElementById('resultsContainer');

  const tierStyle = `background: ${r.tier.color}20; border-color: ${r.tier.color}60; color: ${r.tier.color};`;

  container.innerHTML = `
    <!-- SCORE HERO -->
    <div class="result-score-hero">
      <p class="result-eyebrow">STELARON · FUTURE POTENTIAL REPORT</p>
      <div class="result-big-score">${r.score}</div>
      <div class="result-tier-badge" style="${tierStyle}">${r.tier.name}</div>
      <div class="result-archetype-label">${r.archetype.name}</div>
      <p class="result-archetype-desc">${r.archetype.desc}</p>
    </div>

    <!-- KEY INSIGHTS -->
    <div class="insight-row">
      <div class="insight-cell highlight">
        <div class="insight-type">Biggest Strength</div>
        <div class="insight-value">${r.strengths.split(',')[0]}</div>
      </div>
      <div class="insight-cell danger">
        <div class="insight-type">Critical Bottleneck</div>
        <div class="insight-value">${r.bottleneck.split(' ').slice(0,8).join(' ')}...</div>
      </div>
      <div class="insight-cell">
        <div class="insight-type">Career Velocity</div>
        <div class="insight-value">${r.careerVel}</div>
      </div>
      <div class="insight-cell">
        <div class="insight-type">Risk Level</div>
        <div class="insight-value">${r.riskLevel}</div>
      </div>
    </div>

    <!-- METRICS + BARS -->
    <div class="result-grid">
      <div class="result-card">
        <p class="result-card-title">Performance Metrics</p>
        ${renderBar('Discipline',      r.disciplineRating, 'bar-purple')}
        ${renderBar('Ambition',        r.ambitionRating,   'bar-gold')}
        ${renderBar('Focus',           r.focusRating,      'bar-teal')}
        ${renderBar('Execution',       r.executionRating,  'bar-pink')}
        ${renderBar('Skill Growth',    r.skillGrowth,      'bar-purple')}
        ${renderBar('Wealth Potential',r.wealthPotential,  'bar-gold')}
      </div>
      <div class="result-card">
        <p class="result-card-title">Radar Analysis</p>
        <div class="chart-wrap">
          <canvas id="radarChart" class="result-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- ARCHETYPE DETAIL + PIE -->
    <div class="result-grid">
      <div class="result-card">
        <p class="result-card-title">Your Archetype · ${r.archetype.name}</p>
        <div class="metric-row"><span class="metric-name">Natural Strengths</span><span class="metric-val" style="font-family:var(--font-body);font-size:0.8rem;text-align:right;max-width:55%">${r.archetype.strengths}</span></div>
        <div class="metric-row"><span class="metric-name">Core Weakness</span><span class="metric-val" style="font-family:var(--font-body);font-size:0.8rem;text-align:right;max-width:55%">${r.archetype.weakness}</span></div>
        <div style="margin-top:1rem;padding:1rem;background:rgba(123,92,240,0.06);border-radius:10px;border:1px solid rgba(123,92,240,0.15)">
          <p style="font-family:var(--font-mono);font-size:0.65rem;letter-spacing:.14em;text-transform:uppercase;color:var(--purple-light);margin-bottom:.5rem">Recommended Path</p>
          <p style="font-size:.875rem;color:var(--muted-light);line-height:1.6">${r.archetype.path}</p>
        </div>
        <div style="margin-top:1rem">
          <div class="metric-row"><span class="metric-name">Wealth Potential</span><span class="metric-val">${r.wealthLabel}</span></div>
          <div class="metric-row"><span class="metric-name">Career Velocity</span><span class="metric-val">${r.careerVel}</span></div>
          <div class="metric-row"><span class="metric-name">Risk Level</span><span class="metric-val">${r.riskLevel}</span></div>
        </div>
      </div>
      <div class="result-card">
        <p class="result-card-title">Score Breakdown</p>
        <div class="chart-wrap">
          <canvas id="pieChart" class="result-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- OUTLOOK -->
    <div class="result-card result-card-full">
      <p class="result-card-title">Future Projections</p>
      <div class="outlook-grid">
        <div class="outlook-card">
          <p class="outlook-label">12 Month Outlook</p>
          <p class="outlook-text">${r.outlook12}</p>
        </div>
        <div class="outlook-card">
          <p class="outlook-label">5 Year Outlook</p>
          <p class="outlook-text">${r.outlook5}</p>
        </div>
      </div>
    </div>

    <!-- INSIGHTS -->
    <div class="result-card result-card-full">
      <p class="result-card-title">Key Findings</p>
      <div class="metric-row"><span class="metric-name">Main Opportunity</span><span class="metric-val" style="font-family:var(--font-body);font-size:0.82rem;text-align:right;max-width:60%">${r.opportunity}</span></div>
      <div class="metric-row"><span class="metric-name">Main Risk</span><span class="metric-val" style="font-family:var(--font-body);font-size:0.82rem;text-align:right;max-width:60%">${r.risk}</span></div>
      <div class="metric-row"><span class="metric-name">Highest Leverage Action</span><span class="metric-val" style="font-family:var(--font-body);font-size:0.82rem;text-align:right;max-width:60%">${r.topAction}</span></div>
    </div>

    <!-- ROADMAP -->
    <div class="result-card result-card-full">
      <p class="result-card-title">Your Personal Roadmap</p>
      <ul class="roadmap-list">
        ${r.roadmap.map((item, i) => `
          <li class="roadmap-item">
            <div class="roadmap-num">${String(i+1).padStart(2,'0')}</div>
            <div class="roadmap-text"><strong>${item.title}</strong><br/>${item.body}</div>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- TIER INFO -->
    <div class="result-card result-card-full">
      <p class="result-card-title">Tier · ${r.tier.name}</p>
      <p style="color:var(--muted-light);line-height:1.7;font-size:.9rem;margin-bottom:1rem">${r.tier.meaning}</p>
      <div class="metric-row"><span class="metric-name">Your Score</span><span class="metric-val">${r.score} / 100</span></div>
      <div class="metric-row"><span class="metric-name">Global Percentile</span><span class="metric-val">Top ${getPercentile(r.score)}%</span></div>
      <div class="metric-row"><span class="metric-name">Next Tier</span><span class="metric-val">${getNextTier(r.score)}</span></div>
    </div>

    <!-- RESOURCES -->
    <div class="result-card result-card-full">
      <p class="result-card-title">Recommended Resources for ${r.archetype.name}</p>
      <div class="resources-grid">
        ${r.resources.map(res => `
          <div class="resource-card">
            <p class="resource-type">${res.type}</p>
            <p class="resource-title">${res.title}</p>
            <p class="resource-desc">${res.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- CTA ROW -->
    <div class="result-cta-row">
      <button class="btn-primary" onclick="openShareModal()">Share My Result</button>
      <button class="btn-ghost" onclick="showSection('leaderboard')">View Leaderboard</button>
      <button class="btn-ghost" onclick="startSimulator()">Retake Simulation</button>
    </div>
  `;

  // Render charts after DOM is ready
  setTimeout(() => {
    renderRadarChart(r);
    renderPieChart(r);
  }, 100);

  // Log to leaderboard store
  saveToLeaderboard(r);
}

function renderBar(label, val, cls) {
  return `<div class="result-bar-wrap">
    <div class="result-bar-label"><span>${label}</span><span>${val}%</span></div>
    <div class="result-bar-outer">
      <div class="result-bar-fill ${cls}" style="--target-width:${val}%"></div>
    </div>
  </div>`;
}

function getPercentile(score) {
  if (score >= 96) return 1;
  if (score >= 86) return 5;
  if (score >= 76) return 12;
  if (score >= 61) return 25;
  if (score >= 41) return 45;
  if (score >= 21) return 70;
  return 90;
}

function getNextTier(score) {
  if (score >= 96) return '—  You\'re already Legendary';
  if (score >= 86) return 'LEGENDARY (96+)';
  if (score >= 76) return 'VISIONARY (86+)';
  if (score >= 61) return 'ELITE (76+)';
  if (score >= 41) return 'CHALLENGER (61+)';
  if (score >= 21) return 'BUILDER (41+)';
  return 'WANDERER (21+)';
}

/* ── CHARTS ── */
function renderRadarChart(r) {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  if (radarChart) { radarChart.destroy(); }
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Discipline', 'Ambition', 'Focus', 'Execution', 'Skill Growth', 'Wealth Potential'],
      datasets: [{
        data: [r.disciplineRating, r.ambitionRating, r.focusRating, r.executionRating, r.skillGrowth, r.wealthPotential],
        backgroundColor: 'rgba(123,92,240,0.15)',
        borderColor: 'rgba(157,132,245,0.8)',
        pointBackgroundColor: 'rgba(240,165,0,0.9)',
        pointBorderColor: 'transparent',
        pointRadius: 4,
        borderWidth: 1.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { display: false },
          grid: { color: 'rgba(123,92,240,0.15)' },
          angleLines: { color: 'rgba(123,92,240,0.12)' },
          pointLabels: { color: 'rgba(176,176,210,0.8)', font: { size: 10, family: "'JetBrains Mono'" } },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

function renderPieChart(r) {
  const ctx = document.getElementById('pieChart');
  if (!ctx) return;
  if (pieChart) { pieChart.destroy(); }
  pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Discipline', 'Ambition', 'Focus', 'Execution', 'Learning'],
      datasets: [{
        data: [r.disciplineRating, r.ambitionRating, r.focusRating, r.executionRating, r.skillGrowth],
        backgroundColor: [
          'rgba(123,92,240,0.8)',
          'rgba(240,165,0,0.8)',
          'rgba(0,212,200,0.7)',
          'rgba(246,135,179,0.7)',
          'rgba(104,211,145,0.7)',
        ],
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: 'rgba(176,176,210,0.7)', font: { size: 10, family: "'JetBrains Mono'" }, padding: 12, boxWidth: 10 },
        },
      },
    },
  });
}

/* ── LEADERBOARD DATA ── */
const MOCK_LEADERBOARD = [
  { name: 'Anonymous #1', score: 97, tier: 'LEGENDARY',  archetype: 'The Titan' },
  { name: 'Anonymous #2', score: 94, tier: 'VISIONARY',  archetype: 'The Visionary' },
  { name: 'Anonymous #3', score: 91, tier: 'VISIONARY',  archetype: 'The Founder' },
  { name: 'Anonymous #4', score: 89, tier: 'VISIONARY',  archetype: 'The Strategist' },
  { name: 'Anonymous #5', score: 86, tier: 'VISIONARY',  archetype: 'The Architect' },
  { name: 'Anonymous #6', score: 83, tier: 'ELITE',      archetype: 'The Commander' },
  { name: 'Anonymous #7', score: 79, tier: 'ELITE',      archetype: 'The Innovator' },
  { name: 'Anonymous #8', score: 74, tier: 'CHALLENGER', archetype: 'The Creator' },
  { name: 'Anonymous #9', score: 71, tier: 'CHALLENGER', archetype: 'The Operator' },
  { name: 'Anonymous #10',score: 68, tier: 'CHALLENGER', archetype: 'The Builder' },
];

function saveToLeaderboard(r) {
  let lb = JSON.parse(localStorage.getItem('stelaron_lb') || '[]');
  lb.push({ score: r.score, tier: r.tier.name, archetype: r.archetype.name, ts: Date.now() });
  lb = lb.slice(-50);
  try { localStorage.setItem('stelaron_lb', JSON.stringify(lb)); } catch(e){}
}

function populateLeaderboard() {
  let userEntries = [];
  try { userEntries = JSON.parse(localStorage.getItem('stelaron_lb') || '[]'); } catch(e){}
  const allEntries = [...MOCK_LEADERBOARD];
  userEntries.forEach((e, i) => {
    allEntries.push({ name: `Your Score #${i+1}`, score: e.score, tier: e.tier, archetype: e.archetype, isYours: true });
  });
  allEntries.sort((a,b) => b.score - a.score);

  const topEl = document.getElementById('lbTopScores');
  topEl.innerHTML = allEntries.slice(0,10).map((e,i) => `
    <div class="lb-row">
      <span class="lb-rank ${i<3?'top3':''}">${i+1}</span>
      <span class="lb-name" style="${e.isYours?'color:var(--gold)':''}">${e.name}${e.isYours?' ★':''}</span>
      <span class="lb-val">${e.score}</span>
    </div>
  `).join('');

  // Archetype distribution
  const archMap = {};
  allEntries.forEach(e => { archMap[e.archetype] = (archMap[e.archetype]||0)+1; });
  const archs = Object.entries(archMap).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const total = allEntries.length || 1;
  document.getElementById('lbArchetypes').innerHTML = archs.map(([name,count]) => `
    <div class="lb-row">
      <span class="lb-rank"></span>
      <span class="lb-name">${name}</span>
      <span class="lb-val">${Math.round(count/total*100)}%</span>
    </div>
  `).join('');

  // Tier distribution
  const tierMap = {};
  allEntries.forEach(e => { tierMap[e.tier] = (tierMap[e.tier]||0)+1; });
  const tierOrder = ['LEGENDARY','VISIONARY','ELITE','CHALLENGER','BUILDER','WANDERER','DRIFTER'];
  document.getElementById('lbTiers').innerHTML = tierOrder.filter(t=>tierMap[t]).map(t => `
    <div class="lb-row">
      <span class="lb-rank"></span>
      <span class="lb-name">${t}</span>
      <span class="lb-val">${Math.round((tierMap[t]||0)/total*100)}%</span>
    </div>
  `).join('');
}

/* ── SHARE MODAL ── */
function openShareModal() {
  if (!resultData) return;
  const r = resultData;
  document.getElementById('shareCardPreview').innerHTML = `
    <div class="share-card-logo">STELARON · FUTURE POTENTIAL REPORT</div>
    <div class="share-card-score-num">${r.score}</div>
    <div class="share-card-tier-text">${r.tier.name}</div>
    <div class="share-card-arch">${r.archetype.name}</div>
    <div class="share-card-stats">
      <div class="share-stat">WEALTH <span>${r.wealthLabel}</span></div>
      <div class="share-stat">VELOCITY <span>${r.careerVel}</span></div>
      <div class="share-stat">DISCIPLINE <span>${r.disciplineRating}%</span></div>
      <div class="share-stat">RISK <span>${r.riskLevel}</span></div>
    </div>
    <div class="share-card-url">stelaron.app</div>
  `;
  document.getElementById('shareModal').classList.add('open');
}

function closeShareModal(e) {
  if (!e || e.target === document.getElementById('shareModal') || e.currentTarget?.classList?.contains('modal-close')) {
    document.getElementById('shareModal').classList.remove('open');
  }
}

function getShareText() {
  const r = resultData;
  return `I just ran my Future Potential Simulation on STELARON.\n\n🌌 Score: ${r.score}/100\n🏆 Tier: ${r.tier.name}\n⚡ Archetype: ${r.archetype.name}\n💰 Wealth Potential: ${r.wealthLabel}\n🚀 Career Velocity: ${r.careerVel}\n\nDiscover your future potential at stelaron.app`;
}

function shareOnX() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function shareOnLinkedIn() {
  const url = encodeURIComponent('https://stelaron.app');
  const summary = encodeURIComponent(getShareText());
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${summary}`, '_blank');
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(getShareText());
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function copyResult() {
  navigator.clipboard?.writeText(getShareText()).then(() => {
    showToast('Result copied to clipboard!');
  }).catch(() => {
    showToast('Unable to copy — try manually selecting the text.');
  });
}

/* ── EMAIL ── */
function handleEmailSubmit(e) {
  e.preventDefault();
  showToast('You\'re in. Welcome to Future Builders. 🚀');
  e.target.reset();
}

/* ── EXAMPLE REPORT ── */
function showExampleReport() {
  const exampleAnswers = {
    age: '25_34', status: 'employed', income: 'mid',
    desiredIncome: 'millionaire', screenTime: 3, learningHours: 12,
    ambition: 4, discipline: 3, bigGoal: 'Build a SaaS company to $1M ARR',
    primarySkill: 'tech', timeHorizon: 'years5',
  };
  const result = computeResult(exampleAnswers);
  renderResults(result);
  showSection('results');
}

/* ── KEYBOARD NAVIGATION ── */
document.addEventListener('keydown', e => {
  const simActive = document.getElementById('simulatorSection')?.classList.contains('active');
  if (!simActive) return;
  if (e.key === 'Enter') simNext();
  if (e.key === 'ArrowLeft' || e.key === 'Backspace') simBack();
});
