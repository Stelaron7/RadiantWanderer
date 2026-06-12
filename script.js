/* STELARON V2 — script.js — full engine */

/* ═══════════ STAR CANVAS ═══════════ */
(function(){
  const c=document.getElementById('starCanvas'),ctx=c.getContext('2d');
  let W,H,stars=[],mouse={x:0,y:0};
  function rs(){W=c.width=innerWidth;H=c.height=innerHeight;}
  function mk(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,speed:Math.random()*.12+.025,op:Math.random()*.65+.1,tw:Math.random()*Math.PI*2,tws:Math.random()*.02+.005};}
  function init(){rs();stars=Array.from({length:160},mk);}
  function draw(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{
      s.tw+=s.tws;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(190,180,255,${s.op*(0.6+0.4*Math.sin(s.tw))})`;ctx.fill();
      s.y-=s.speed;if(s.y<-2)Object.assign(s,mk(),{y:H+2});
    });
    const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,200);
    g.addColorStop(0,'rgba(123,92,240,.025)');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    requestAnimationFrame(draw);
  }
  addEventListener('resize',rs);
  addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
  init();draw();
})();

/* ═══════════ CONFETTI ═══════════ */
const confCvs=document.getElementById('confettiCanvas');
const confCtx=confCvs.getContext('2d');
let confParts=[];
function resizeConf(){confCvs.width=innerWidth;confCvs.height=innerHeight;}
resizeConf();addEventListener('resize',resizeConf);
function launchConfetti(){
  const cols=['#7B5CF0','#9D84F5','#F0A500','#FFD166','#00D4C8','#F687B3','#68D391'];
  confParts=Array.from({length:110},()=>({
    x:Math.random()*innerWidth,y:-10,
    vx:(Math.random()-.5)*4,vy:Math.random()*3+2,
    rot:Math.random()*360,rotV:(Math.random()-.5)*8,
    w:Math.random()*8+4,h:Math.random()*4+2,
    col:cols[Math.floor(Math.random()*cols.length)],
    life:1
  }));
  animConf();
}
function animConf(){
  confCtx.clearRect(0,0,confCvs.width,confCvs.height);
  confParts=confParts.filter(p=>p.life>0);
  confParts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.rot+=p.rotV;p.vy+=.05;p.life-=.012;
    confCtx.save();confCtx.globalAlpha=p.life;
    confCtx.translate(p.x,p.y);confCtx.rotate(p.rot*Math.PI/180);
    confCtx.fillStyle=p.col;confCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
    confCtx.restore();
  });
  if(confParts.length)requestAnimationFrame(animConf);
}

/* ═══════════ LIVE COUNTER ANIMATION ═══════════ */
let liveBase=12847;
function animLive(){
  liveBase+=Math.floor(Math.random()*3);
  const fmt=liveBase.toLocaleString();
  document.querySelectorAll('#liveNum,#heroLive').forEach(el=>{if(el)el.textContent=fmt;});
  setTimeout(animLive,Math.random()*4000+2000);
}
animLive();

/* ═══════════ TICKER DUPLICATE for seamless loop ═══════════ */
const ticker=document.getElementById('ticker');
if(ticker){ticker.innerHTML+=ticker.innerHTML;}

/* ═══════════ SECTION NAV ═══════════ */
function showSection(name){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('active'));
  document.getElementById(name+'Section').classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(name==='leaderboard')buildLeaderboard();
}
function goHome(){showSection('home');}

/* ═══════════ TOAST ═══════════ */
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

/* ═══════════ EMAIL ═══════════ */
function handleEmail(e){e.preventDefault();toast('Welcome to Future Builders! 🚀');e.target.reset();}

/* ═══════════ QUESTIONS ═══════════ */
const QS=[
  {id:'age',lbl:'About You',title:'How old are you?',sub:'Your stage directly shapes your trajectory window.',type:'opts',options:[
    {v:'under18',icon:'🌱',label:'Under 18',desc:'Early stage builder'},
    {v:'18_24',icon:'⚡',label:'18–24',desc:'Launch window'},
    {v:'25_29',icon:'🔥',label:'25–29',desc:'First high-stakes decade'},
    {v:'30_35',icon:'🏗️',label:'30–35',desc:'Building real leverage'},
    {v:'36_44',icon:'🎯',label:'36–44',desc:'Compounding years'},
    {v:'45plus',icon:'👑',label:'45+',desc:'Wisdom and capital tier'},
  ]},
  {id:'status',lbl:'Current Role',title:'What's your primary role right now?',sub:'Your environment shapes your growth ceiling.',type:'opts',options:[
    {v:'student',icon:'📚',label:'Student',desc:'Full-time learning mode'},
    {v:'employed',icon:'💼',label:'Employed',desc:'Working for an org'},
    {v:'founder',icon:'🚀',label:'Founder / Builder',desc:'Running your own thing'},
    {v:'freelancer',icon:'🎯',label:'Freelancer',desc:'Independent operator'},
    {v:'between',icon:'🌀',label:'In transition',desc:'Between stages'},
  ]},
  {id:'income',lbl:'Current Reality',title:'Your approximate annual income?',sub:'Establishes your starting position — no judgment.',type:'opts',options:[
    {v:'none',icon:'—',label:'None / Student',desc:'Pre-income phase'},
    {v:'low',icon:'📈',label:'Under $20K',desc:'Starting out'},
    {v:'mid_low',icon:'💰',label:'$20K–$50K',desc:'Building base'},
    {v:'mid',icon:'💵',label:'$50K–$100K',desc:'Solid foundation'},
    {v:'high',icon:'🔥',label:'$100K–$250K',desc:'High performer'},
    {v:'elite',icon:'👑',label:'$250K+',desc:'Top earner'},
  ]},
  {id:'desired',lbl:'Income Ambition',title:'What income level are you aiming for?',sub:'Your ceiling ambition is a direct input into your score.',type:'opts',options:[
    {v:'comfort',icon:'🏡',label:'$50K–$100K',desc:'Comfortable & stable'},
    {v:'pro',icon:'🏆',label:'$100K–$250K',desc:'High professional'},
    {v:'affluent',icon:'💎',label:'$250K–$1M',desc:'Affluent tier'},
    {v:'million',icon:'🚀',label:'$1M–$10M',desc:'Millionaire track'},
    {v:'multi',icon:'🌍',label:'$10M+',desc:'Generational wealth'},
  ]},
  {id:'screen',lbl:'Time Audit',title:'Daily mindless screen time (hours)?',sub:'Social media, news feeds, passive YouTube. Be honest.',type:'slider',min:0,max:12,step:.5,def:4,unit:'hrs/day',minL:'0h',maxL:'12h+'},
  {id:'learn',lbl:'Growth Investment',title:'Weekly active learning hours?',sub:'Books, courses, skill practice — deliberate learning only.',type:'slider',min:0,max:40,step:1,def:5,unit:'hrs/week',minL:'0h',maxL:'40h'},
  {id:'ambition',lbl:'Drive',title:'How would you rate your raw ambition?',sub:'Your honest desire to achieve something that matters.',type:'opts',options:[
    {v:1,icon:'😴',label:'Low',desc:'Content with average'},
    {v:2,icon:'😐',label:'Moderate',desc:'Some desire to grow'},
    {v:3,icon:'💪',label:'High',desc:'Strong drive to succeed'},
    {v:4,icon:'🔥',label:'Obsessive',desc:'Relentless, non-negotiable'},
  ]},
  {id:'discipline',lbl:'Execution',title:'How disciplined are you with your habits?',sub:'Doing hard things consistently when you don't feel like it.',type:'opts',options:[
    {v:1,icon:'🌀',label:'Inconsistent',desc:'Often breaks routines'},
    {v:2,icon:'🎯',label:'Developing',desc:'Working on it actively'},
    {v:3,icon:'⚡',label:'Solid',desc:'Usually follows through'},
    {v:4,icon:'🏆',label:'Elite',desc:'Rarely breaks commitments'},
  ]},
  {id:'goal',lbl:'Vision',title:'What is your biggest goal right now?',sub:'The one thing you're most actively building toward.',type:'text',placeholder:'e.g. Build a SaaS to $10K MRR, get promoted to VP, launch a creative business...'},
  {id:'skill',lbl:'Core Asset',title:'Your most developed skill or domain?',sub:'Your primary vehicle for creating value.',type:'opts',options:[
    {v:'tech',icon:'💻',label:'Tech / Engineering',desc:'Code, systems, data'},
    {v:'biz',icon:'📊',label:'Business / Strategy',desc:'Ops, growth, finance'},
    {v:'creative',icon:'🎨',label:'Creative / Design',desc:'Art, content, UX'},
    {v:'sales',icon:'🤝',label:'Sales / Marketing',desc:'Persuasion, growth'},
    {v:'lead',icon:'🏛️',label:'Leadership / People',desc:'Managing, building teams'},
    {v:'science',icon:'🔬',label:'Science / Research',desc:'Analysis, discovery'},
  ]},
  {id:'horizon',lbl:'Time Perspective',title:'How far ahead do you actively plan?',sub:'Long-range thinking is the number one predictor of compounding outcomes.',type:'opts',options:[
    {v:'days',icon:'📅',label:'Days',desc:'Living in the present'},
    {v:'months',icon:'🗓️',label:'Months',desc:'Short-term planner'},
    {v:'year',icon:'🎯',label:'1 Year',desc:'Annual thinker'},
    {v:'years3',icon:'🗺️',label:'3 Years',desc:'Medium-range strategist'},
    {v:'years5',icon:'🔭',label:'5+ Years',desc:'Long-range visionary'},
  ]},
];

let step=0,answers={};

function startSim(){
  step=0;answers={};
  showSection('simulator');
  renderQ();
}
function showExample(){
  answers={age:'25_29',status:'founder',income:'mid',desired:'million',screen:3,learn:12,ambition:4,discipline:3,goal:'Build a SaaS company',skill:'tech',horizon:'years5'};
  const r=compute(answers);
  renderResult(r);
  showSection('results');
}

function renderQ(){
  const q=QS[step];
  const pct=step/QS.length*100;
  document.getElementById('simProg').style.width=pct+'%';
  document.getElementById('simStepLbl').textContent=`${step+1} of ${QS.length}`;
  document.getElementById('backBtn').style.visibility=step>0?'visible':'hidden';

  let h=`<div class="q-eyebrow">${q.lbl}</div>
          <h2 class="q-title">${q.title}</h2>
          <p class="q-sub">${q.sub}</p>`;

  if(q.type==='opts'){
    const cols=q.options.length<=3?'col1':'';
    h+=`<div class="opts ${cols}">`;
    q.options.forEach(o=>{
      const sv=typeof o.v==='number'?o.v:o.v;
      const sel=answers[q.id]===sv?'sel':'';
      h+=`<button class="opt ${sel}" onclick="pickOpt('${q.id}',this,'${sv}')">`
        +`<span class="opt-icon">${o.icon}</span>`
        +`<span class="opt-label">${o.label}</span>`
        +`<span class="opt-desc">${o.desc}</span>`
        +`</button>`;
    });
    h+=`</div>`;
  } else if(q.type==='slider'){
    const cur=answers[q.id]!==undefined?answers[q.id]:q.def;
    h+=`<div class="slid-wrap">
          <div class="slid-val" id="slidVal">${cur} ${q.unit}</div>
          <input type="range" class="slid" id="theSlid" min="${q.min}" max="${q.max}" step="${q.step}" value="${cur}"
                 oninput="onSlid(this.value,'${q.unit}','${q.id}')"/>
          <div class="slid-ends"><span>${q.minL}</span><span>${q.maxL}</span></div>
        </div>`;
  } else {
    const v=answers[q.id]||'';
    h+=`<input type="text" class="text-inp" id="textInp" placeholder="${q.placeholder}" value="${v}"
               oninput="answers['${q.id}']=this.value"/>`;
  }

  const body=document.getElementById('simBody');
  body.innerHTML=h;
  body.style.animation='none';void body.offsetWidth;body.style.animation='fadeUp .4s ease';
}

function pickOpt(id,el,v){
  answers[id]=isNaN(v)?v:Number(v);
  document.querySelectorAll('.opt').forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel');
}
function onSlid(v,unit,id){
  answers[id]=parseFloat(v);
  document.getElementById('slidVal').textContent=`${v} ${unit}`;
}
function simBack(){if(step>0){step--;renderQ();}}
function simNext(){
  const q=QS[step];
  if(q.type==='slider'){
    const el=document.getElementById('theSlid');
    answers[q.id]=el?parseFloat(el.value):q.def;
  }
  if(q.type==='text'){
    const el=document.getElementById('textInp');
    answers[q.id]=el&&el.value.trim()?el.value.trim():'Build something meaningful';
  }
  if(q.type==='opts'&&answers[q.id]===undefined){toast('Pick an option to continue');return;}
  step++;
  if(step>=QS.length) startCalc();
  else renderQ();
}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('simulatorSection').classList.contains('active'))return;
  if(e.key==='Enter'&&e.target.tagName!=='INPUT')simNext();
  if(e.key==='ArrowLeft')simBack();
});

/* ═══════════ CALCULATION ═══════════ */
const CALC_MSGS=['Mapping your behavioral patterns...','Calculating discipline coefficient...','Projecting your 5-year trajectory...','Identifying highest-leverage opportunities...','Assigning your archetype...','Generating your Future Potential Report...'];
function startCalc(){
  showSection('calc');
  let pct=0,mi=0;
  const bar=document.getElementById('calcBar'),msg=document.getElementById('calcMsg');
  const iv=setInterval(()=>{
    pct+=Math.random()*17+4;if(pct>100)pct=100;
    bar.style.width=pct+'%';
    if(mi<CALC_MSGS.length-1&&pct>(mi+1)*16){
      mi++;msg.style.opacity='0';
      setTimeout(()=>{msg.textContent=CALC_MSGS[mi];msg.style.opacity='1';},220);
    }
    if(pct>=100){
      clearInterval(iv);
      setTimeout(()=>{const r=compute(answers);renderResult(r);showSection('results');},600);
    }
  },270);
}

/* ═══════════ SCORING ENGINE ═══════════ */
function compute(a){
  let s=0;
  const ageM={under18:5,'18_24':10,'25_29':9,'30_35':8,'36_44':7,'45plus':6};
  s+=ageM[a.age]||7;
  const statM={student:7,employed:6,founder:10,freelancer:9,between:4};
  s+=statM[a.status]||6;
  const incM={none:1,low:2,mid_low:4,mid:6,high:8,elite:10};
  const desM={comfort:4,pro:6,affluent:8,million:9,multi:10};
  const iS=incM[a.income]||3,dS=desM[a.desired]||6;
  s+=iS*.8+Math.max(0,dS-iS)*.9;
  s-=Math.min(a.screen||0,12)*.9;
  s+=Math.min(a.learn||0,40)*.55;
  s+=(a.ambition||1)*3.5;
  s+=(a.discipline||1)*5;
  const hM={days:0,months:2,year:4,years3:7,years5:10};
  s+=hM[a.horizon]||3;
  const skM={tech:8,biz:8,sales:7,creative:6,lead:7,science:7};
  s+=skM[a.skill]||6;
  s=Math.max(0,Math.min(100,Math.round((s/108)*100)));

  const disc=Math.round((a.discipline||1)/4*100);
  const amb=Math.round((a.ambition||1)/4*100);
  const foc=Math.round(Math.max(0,100-(a.screen||0)*7));
  const exec=Math.round((((a.discipline||1)/4*.5)+((a.learn||0)/40*.5))*100);
  const grow=Math.round((a.learn||0)/40*100);
  const wp=Math.round(dS/10*60+iS/10*20+(a.ambition||1)/4*20);

  return{
    score:s,
    tier:tier(s),
    arch:archetype(a,s),
    disc,amb,foc,exec,grow,wp,
    risk:riskLevel(a),
    vel:careerVel(s),
    wlabel:wealthLabel(wp),
    topAction:topAction(a,s),
    surprise:surpriseInsight(a,s),
    outlook12:outlook12(a,s),
    outlook5:outlook5(a,s),
    strength:strengths(a,s),
    weakness:weakness(a,s),
    opportunity:opportunity(a,s),
    mainRisk:mainRisk(a,s),
    bottleneck:bottleneck(a,s),
    roadmap:roadmap(a,s),
    resources:resources(a),
    answers:a,
  };
}

function tier(s){
  if(s<=20)return{name:'DRIFTER',color:'#6B6B90',meaning:'You\'re moving without a direction. Your potential is largely untapped — and the patterns keeping you here are changeable.'};
  if(s<=40)return{name:'WANDERER',color:'#7EC8E3',meaning:'You have ambition but lack the systems to convert it into compounding results. The gap is smaller than it feels.'};
  if(s<=60)return{name:'BUILDER',color:'#68D391',meaning:'You\'re laying real foundations. The habits and skills you\'re building now will compound harder than you expect.'};
  if(s<=75)return{name:'CHALLENGER',color:'#F6AD55',meaning:'You\'re actively competing and growing. A few targeted upgrades will break you into the top tier.'};
  if(s<=85)return{name:'ELITE',color:'#F687B3',meaning:'You operate in the top tier of focused individuals. Leverage and execution at scale are your next frontiers.'};
  if(s<=95)return{name:'VISIONARY',color:'#9D84F5',meaning:'You operate at a level most people never reach. Your consistency and long-range thinking set you apart.'};
  return{name:'LEGENDARY',color:'#F0A500',meaning:'Extraordinary profile. The fundamentals are all in place — the question now is magnitude and legacy.'};
}

function archetype(a,s){
  const sk=a.skill,st=a.status,am=a.ambition||1,di=a.discipline||1;
  let name;
  if(st==='founder'&&am>=3)name='The Founder';
  else if(sk==='tech'&&di>=3)name='The Architect';
  else if(sk==='biz'&&am>=3)name='The Strategist';
  else if(sk==='lead'&&s>=65)name='The Commander';
  else if(st==='employed'&&di>=3)name='The Operator';
  else if(sk==='creative'&&am>=3)name='The Creator';
  else if(sk==='science'&&di>=3)name='The Innovator';
  else if(s>=80&&am>=4)name='The Visionary';
  else if(s>=90)name='The Titan';
  else if(sk==='sales')name='The Builder';
  else name='The Explorer';
  return archData(name);
}

function archData(n){
  const m={
    'The Founder':{name:n,desc:'You are wired to build from scratch. You see gaps others ignore and have the conviction to fill them.',str:'Vision, risk tolerance, problem-solving under pressure.',weak:'Tends to neglect execution details; can burn out from doing everything.',path:'Focus on leverage: hire before you feel ready, systematize before you scale.'},
    'The Architect':{name:n,desc:'You build systems that outlast your direct involvement. Code, infrastructure, and elegant design are your medium.',str:'Deep thinking, precision, scalable output.',weak:'May undervalue communication; optimizes for perfect over shipped.',path:'Move from individual contributor to technical leader. Your leverage multiplies with every person you enable.'},
    'The Strategist':{name:n,desc:'You see the chess board five moves ahead. You allocate, optimize, and architect decisions others react to.',str:'Pattern recognition, resource allocation, long-range planning.',weak:'Tendency to plan without executing. Analysis paralysis is your nemesis.',path:'Partner with high-execution operators. Your value compounds when your strategy gets implemented.'},
    'The Commander':{name:n,desc:'You multiply through others. Your clarity and presence turn potential into performance.',str:'Influence, decisiveness, inspiring action under uncertainty.',weak:'Can over-rely on authority and neglect technical depth.',path:'Build your own organization. Your ceiling is the quality of people you attract and develop.'},
    'The Operator':{name:n,desc:'You are the engine inside the machine. Systems run better because you exist.',str:'Reliability, process mastery, high-quality output consistently.',weak:'Can become invisible — doing excellent work that others take credit for.',path:'Document your impact quantitatively. Make your value undeniable, then negotiate from strength.'},
    'The Creator':{name:n,desc:'You produce work that resonates, moves, and sticks. The world needs your output.',str:'Originality, audience connection, emotional resonance.',weak:'May resist monetization or undervalue commercial potential.',path:'Build an owned audience. Creators with distribution have unlimited leverage — the economics are asymmetric.'},
    'The Innovator':{name:n,desc:'You operate at the frontier of what\'s known. Curiosity is your structural competitive advantage.',str:'First-principles thinking, novel problem-solving, intellectual range.',weak:'Pursues novelty at the expense of completion and commercial application.',path:'Find where your research meets real demand. That intersection is where extraordinary value lives.'},
    'The Explorer':{name:n,desc:'You are in the most important phase: discovering what you\'re actually built for.',str:'Adaptability, breadth of exposure, unconventional perspective.',weak:'Lacks compounding in a single domain. Breadth without depth is expensive at scale.',path:'Run 90-day experiments in high-leverage domains. The goal is finding your one thing — then going all in.'},
    'The Builder':{name:n,desc:'You create tangible things — pipelines, relationships, products, and revenue.',str:'Execution, persuasion, relationship capital, momentum.',weak:'May optimize for visible wins over long-term compounding value.',path:'Build equity, not just income. Every dollar earned should be building something that pays without you.'},
    'The Visionary':{name:n,desc:'You see what\'s coming before others do, and you have the discipline to position accordingly.',str:'Long-range thinking, pattern spotting, inspiring others toward a future.',weak:'Struggles translating vision into steps others can follow.',path:'Build the platform that makes your vision real at scale — company, fund, or movement.'},
    'The Titan':{name:n,desc:'You have the rare combination: clarity of vision, iron discipline, relentless execution.',str:'Almost everything. Your edge is compounding mastery.',weak:'Risk of isolation at the top. Systems and people need to scale with you.',path:'Your next level is institutional. Build legacy systems that outlive your direct involvement.'},
  };
  return m[n]||m['The Explorer'];
}

function riskLevel(a){
  let c=0;
  if((a.screen||0)>5)c++;
  if((a.learn||0)<3)c++;
  if((a.discipline||1)<=1)c++;
  if(a.horizon==='days'||a.horizon==='months')c++;
  return c>=3?'HIGH':c===2?'MODERATE':c===1?'LOW':'MINIMAL';
}
function careerVel(s){return s>=85?'VERY HIGH':s>=70?'HIGH':s>=50?'MODERATE':s>=30?'LOW':'STALLED';}
function wealthLabel(wp){return wp>=85?'VERY HIGH':wp>=65?'HIGH':wp>=45?'MODERATE':wp>=25?'DEVELOPING':'EARLY STAGE';}

function topAction(a,s){
  if((a.screen||0)>5)return'Cut passive screen time by 60% immediately — this single change will free more cognitive bandwidth than almost anything else you could do.';
  if((a.learn||0)<5)return'Commit to 1 hour of deep learning daily — this compounds faster than any other behavioral change in your profile.';
  if((a.discipline||1)<=2)return'Install a non-negotiable morning anchor habit — your discipline is your most underdeveloped asset and the bottleneck to everything else.';
  if(a.horizon==='days'||a.horizon==='months')return'Write a 3-year vision document today — upgrading your time horizon will immediately change the quality of your daily decisions.';
  if(s<50)return'Identify your one highest-leverage skill and commit to 6 focused months. Depth beats breadth at every income level.';
  if(s<70)return'Find a mentor operating 5 years ahead of where you want to be — proximity to the right person accelerates faster than any course or book.';
  if(s<85)return'Build one income stream that doesn\'t require your direct time — your next tier requires passive leverage, not more hours.';
  return'Document and systematize everything you do well. Your job now is to multiply your impact through others — you can\'t do this alone anymore.';
}

/* THE KEY FIX: counterintuitive surprise insight */
function surpriseInsight(a,s){
  const ageGroup=a.age;
  const isOlder=ageGroup==='30_35'||ageGroup==='36_44'||ageGroup==='45plus';

  if((a.discipline||1)>=3&&(a.learn||0)<5)
    return'Your discipline score is actually hiding a problem: you\'re consistent at the wrong things. You execute reliably — but not on the activities that compound.';
  if((a.ambition||1)>=4&&(a.discipline||1)<=2)
    return'High ambition with low discipline doesn\'t create outcomes — it creates guilt. The gap between your vision and your current habits is your biggest psychological risk.';
  if((a.screen||0)<=2&&s<55)
    return'Your screen time is not the issue — which means the real bottleneck is harder to see. Your inputs are cleaner than most people at your score, but your outputs suggest a clarity problem, not a distraction problem.';
  if(isOlder&&s>=70)
    return'Most people your age with your profile are optimizing for income. The bigger opportunity is equity — building or owning things that appreciate without your time. You have the foundation; you need the structure.';
  if(a.status==='employed'&&(a.ambition||1)>=4&&s>=60)
    return'Your ambition profile is mismatched with your employment structure. You have the drive of a founder operating inside a salary cap. This tension will either push you to build something or gradually compress your potential.';
  if((a.learn||0)>=15&&s<60)
    return'You\'re learning a lot — but not translating it into output. Knowledge without shipping is a hobby. The bottleneck isn\'t information, it\'s deployment. Build something with what you already know.';
  if(s>=80&&(a.horizon==='days'||a.horizon==='months'))
    return'This is your most expensive blind spot: you have a high-performance profile operating on a short time horizon. You\'re sprinting in the wrong direction. One 3-year plan session would do more for your trajectory than 6 months of effort.';
  if(a.status==='student'&&s>=65)
    return'You have something most adults would pay anything for: unconstrained time. Your score at this stage is genuinely rare. The risk isn\'t failure — it\'s not betting big enough while the stakes are still low.';
  return'Your profile suggests you are significantly closer to the next tier than your score implies. The gap is behavioral, not circumstantial — meaning it\'s fully within your control to close it in under 90 days.';
}

function outlook12(a,s,tier){
  const tname=(tier&&tier.name)||'BUILDER';
  const m={
    DRIFTER:'Without behavioral change, 12 months looks like today. With one anchor change — screen time or learning — you could reach Builder tier in this window.',
    WANDERER:'If you install one consistent system this month and raise learning hours to 7+, you\'ll see your first real compounding signal within 12 months.',
    BUILDER:'You\'re approaching an inflection. In 12 months, with discipline upgrades and a ceiling raise on ambition, you enter Challenger tier with real momentum.',
    CHALLENGER:'Your fundamentals are solid. The next 12 months hinge on one big bet — a project, role, or skill that permanently separates you from the 60–75 range.',
    ELITE:'You\'re positioned for a major output year. One focused project could produce exceptional returns. Prioritize ruthlessly — your ceiling is leverage, not hours.',
    VISIONARY:'Your next 12 months should create assets, not just income. Anything that doesn\'t compound isn\'t worth your attention at this profile level.',
    LEGENDARY:'Your next 12 months should be about scale and institutional impact. The fundamentals are all in place — what gets built now could outlast the builder.',
  };
  return m[tname]||m['BUILDER'];
}

function outlook5(a,s){
  const is30s=a.age==='30_35'||a.age==='36_44';
  if(is30s&&s>=65)return'Five years of consistent execution at your age puts you in a genuinely differentiated position — financially, professionally, and in terms of options. The window for building equity-generating assets is wide open. Your 40s could look completely different from your peers.';
  if(is30s&&s<65)return'Five years is enough to close a significant gap — but only if the behavioral changes start now, not next year. At your stage, the cost of delay is higher than it was in your 20s because compounding windows are shortening.';
  if(s>=80)return'Five years in the top tier — with intentional moves — typically produces top 5% outcomes. The question isn\'t if anymore. It\'s what you\'re building and for whom.';
  if(s>=60)return'Five years of Challenger momentum builds significant leverage. You\'re likely to be in senior leadership, running your own thing, or deeply specialized in a high-demand domain.';
  return'Five years is enough time to completely rewrite your trajectory — if the foundation work starts in the next 6 months. The math of compounding is brutally forgiving to those who start, and brutal to those who don\'t.';
}

function strengths(a,s){
  const out=[];
  if((a.discipline||1)>=3)out.push('Strong execution habits');
  if((a.ambition||1)>=3)out.push('High ambition');
  if((a.learn||0)>=10)out.push('Active learning investment');
  if(a.status==='founder')out.push('Entrepreneurial mindset');
  if(a.horizon==='years5'||a.horizon==='years3')out.push('Long-range thinking');
  if((a.screen||0)<=2)out.push('Deep focus capacity');
  if(s>=70)out.push('High output profile');
  return out.length?out.join(', '):'Multiple dimensions with strong growth upside';
}

function weakness(a,s){
  if((a.screen||0)>6)return'Excessive passive screen time — the cognitive drain is compounding silently.';
  if((a.learn||0)<3)return'Insufficient learning investment — skills stagnate without deliberate practice.';
  if((a.discipline||1)<=1)return'Low discipline means strong ideas rarely convert into consistent results.';
  if(a.horizon==='days')return'Short time horizon — the decisions it generates are too tactical to compound.';
  if(s<40)return'Multiple patterns working against compounding simultaneously.';
  return'The gap between ambition and daily action — closeable but requiring explicit intention.';
}

function opportunity(a,s){
  if(a.status==='student'&&s>50)return'You have time leverage that most adults would trade serious money for. Use it to build skills, reputation, or projects while the stakes are low.';
  if(a.skill==='tech'&&s>50)return'Technical skills combined with AI literacy represent the highest ROI investment window in decades. Double down.';
  if(a.skill==='creative'&&s>50)return'Distribution is now essentially free. An owned audience around your creative work has asymmetric leverage — one good piece can change everything.';
  if((a.learn||0)>10)return'Your learning investment rate gives you a compounding knowledge advantage. Pair it with high-visibility output projects to make it visible.';
  if((a.age==='30_35'||a.age==='36_44')&&s>60)return'You have something rare: experience + energy + enough income to make asymmetric bets. The window to build equity-generating assets is open right now.';
  return'Going deep on one skill for 12 months will create an asymmetric advantage in a world of shallow generalists.';
}

function mainRisk(a,s){
  if((a.screen||0)>7)return'Attention fragmentation is compounding silently. Every hour of passive consumption is a delayed cost you\'re not accounting for.';
  if((a.discipline||1)<=1&&(a.ambition||1)>=3)return'High ambition + low discipline = motivation without execution. This pattern creates guilt and stagnation simultaneously.';
  if(a.horizon==='days')return'Short time horizons create short decisions. You\'ll keep optimizing for today at the cost of the position you\'re trying to reach.';
  if(s>70&&(a.learn||0)<5)return'High performers who stop learning lose their edge faster than they expect in a fast-moving environment.';
  return'Complacency is the silent threat at every tier. The habits that got you here won\'t get you to the next level.';
}

function bottleneck(a,s){
  const issues=[];
  if((a.screen||0)>5)issues.push({w:3,m:'Screen time is consuming your highest-value cognitive hours daily'});
  if((a.learn||0)<5)issues.push({w:2.5,m:'Learning rate below the threshold needed for meaningful skill compounding'});
  if((a.discipline||1)<=2)issues.push({w:3.5,m:'Inconsistent discipline makes all other strengths unreliable and non-compounding'});
  if(a.horizon==='days')issues.push({w:2,m:'Short time horizon generates tactical decisions at the cost of strategic position'});
  if(!issues.length)return'Your biggest constraint is now scale — you\'ve built solid fundamentals, and execution speed with leverage is the new bottleneck.';
  return issues.sort((a,b)=>b.w-a.w)[0].m;
}

function roadmap(a,s){
  const r=[];
  if((a.screen||0)>4)r.push({t:'Reclaim attention bandwidth',b:'Cap passive screen time to 90 minutes daily. Install blockers during your peak cognitive hours. This is the highest-leverage behavioral change in your profile.'});
  if((a.learn||0)<7)r.push({t:'Install a daily learning system',b:'Commit to 1 focused hour daily on your primary skill domain. Deliberate practice, not passive consumption. This compounds at rates most people don\'t believe until they see it.'});
  if((a.discipline||1)<=2)r.push({t:'Build your discipline stack',b:'Start with one non-negotiable daily anchor habit. Morning deep work, exercise, or skill practice. Compound from one to three over 60 days.'});
  if(a.horizon==='days'||a.horizon==='months')r.push({t:'Write your 3-year vision document',b:'Spend 2 focused hours writing exactly where you want to be in 36 months — financially, professionally, personally. Long-range clarity changes daily micro-decisions.'});
  if(a.status!=='founder'&&s>55)r.push({t:'Launch a parallel asset',b:'Begin building something outside your primary income: side project, audience, or skill with equity potential. Income is a salary cap; assets are not.'});
  r.push({t:'Find your accelerant environment',b:'Join or build a peer group operating 1 tier above your current level. Proximity to higher standards accelerates faster than any course or book.'});
  r.push({t:'Retake in 30 days',b:'Return after implementing changes. Watch your score evolve. Build evidence of your own trajectory. The leaderboard tracks your improvement.'});
  return r.slice(0,5);
}

function resources(a){
  const base=[
    {type:'Book',title:'Atomic Habits — James Clear',desc:'The most practical framework for making discipline automatic through system design rather than willpower.',cta:'Find it on Amazon →',url:'https://www.amazon.com/s?k=atomic+habits'},
    {type:'Framework',title:'The Leverage Equation',desc:'Code, media, capital, labor — the four mechanisms of infinite leverage in the modern economy. Understanding these changes how you allocate time.',cta:'Learn more →',url:'https://nav.al/wealth'},
    {type:'Practice',title:'Weekly Review System',desc:'A structured Sunday session to audit your week, reset priorities, and track evidence of your own compounding growth.',cta:'Read the protocol →',url:'https://gettingthingsdone.com/'},
  ];
  const sMap={
    tech:{type:'Skill Path',title:'Build with AI — Practical Guide',desc:'The highest-leverage technical combination for the next decade: systems thinking plus applied AI deployment.',cta:'Start here →',url:'https://www.deeplearning.ai/'},
    biz:{type:'Skill Path',title:'Unit Economics Mastery',desc:'Understanding LTV, CAC, and margins at a deep level separates the operators who scale from those who plateau.',cta:'Start here →',url:'https://a16z.com/'},
    creative:{type:'Skill Path',title:'Audience Architecture',desc:'Building distribution you own — newsletter, social graph, community — is the leverage multiplier for creators.',cta:'Start here →',url:'https://convertkit.com/'},
    sales:{type:'Skill Path',title:'Value Articulation Training',desc:'Explaining exactly why you create value, in the buyer\'s language, is the highest-leverage sales skill in existence.',cta:'Start here →',url:'https://www.hubspot.com/resources'},
    lead:{type:'Skill Path',title:'High-Output Management',desc:'Leaders who can\'t delegate are capped at what they personally do. Learn to build trust systems that scale.',cta:'Start here →',url:'https://www.amazon.com/s?k=high+output+management'},
    science:{type:'Skill Path',title:'Applied Research to Product',desc:'The gap between pure research and commercial application is one of the most valuable places to position yourself.',cta:'Start here →',url:'https://substack.com/'},
  };
  if(sMap[a.skill])base.unshift(sMap[a.skill]);
  return base.slice(0,4);
}

/* ═══════════ RENDER RESULTS ═══════════ */
let resultData=null;
function renderResult(r){
  resultData=r;
  saveToLB(r);
  launchConfetti();

  const tierStyle=`background:${r.tier.color}18;border-color:${r.tier.color}55;color:${r.tier.color};`;

  document.getElementById('resultsWrap').innerHTML=`

  <!-- ICONIC HERO CARD — the screenshot -->
  <div class="r-hero">
    <div class="r-hero-logo">STELARON · FUTURE POTENTIAL REPORT</div>
    <div class="r-big-score">${r.score}</div>
    <div class="r-tier-badge" style="${tierStyle}">${r.tier.name}</div>
    <div class="r-arch-name">${r.arch.name}</div>
    <p class="r-arch-desc">${r.arch.desc}</p>
    <div class="r-hero-metrics">
      <div class="r-hm"><div class="r-hm-val">${r.wlabel}</div><div class="r-hm-lbl">Wealth Potential</div></div>
      <div class="r-hm"><div class="r-hm-val">${r.vel}</div><div class="r-hm-lbl">Career Velocity</div></div>
      <div class="r-hm"><div class="r-hm-val">${r.disc}%</div><div class="r-hm-lbl">Discipline</div></div>
      <div class="r-hm"><div class="r-hm-val">${r.foc}%</div><div class="r-hm-lbl">Focus</div></div>
      <div class="r-hm"><div class="r-hm-val">${r.risk}</div><div class="r-hm-lbl">Risk Level</div></div>
      <div class="r-hm"><div class="r-hm-val">Top ${pctile(r.score)}%</div><div class="r-hm-lbl">Global Rank</div></div>
    </div>
    <div class="r-surprise">${r.surprise}</div>
  </div>

  <!-- SHARE ROW — front and center -->
  <div class="r-share-row">
    <button class="share-hero-btn sb-primary" onclick="openShare()">📤 Share My Result</button>
    <button class="share-hero-btn sb-challenge" onclick="openShare(true)">⚡ Challenge a Friend</button>
    <button class="share-hero-btn ghost-btn" onclick="showSection('leaderboard')">📊 Leaderboard</button>
  </div>

  <!-- KEY INSIGHTS -->
  <div class="insight-row">
    <div class="ic hl"><div class="ic-type">Biggest Strength</div><div class="ic-val">${r.strength.split(',')[0]}</div></div>
    <div class="ic dn"><div class="ic-type">Critical Bottleneck</div><div class="ic-val">${r.bottleneck.split(' ').slice(0,9).join(' ')}...</div></div>
    <div class="ic"><div class="ic-type">Main Opportunity</div><div class="ic-val">${r.opportunity.split(' ').slice(0,10).join(' ')}...</div></div>
    <div class="ic"><div class="ic-type">Highest Leverage Action</div><div class="ic-val">${r.topAction.split(' ').slice(0,8).join(' ')}...</div></div>
  </div>

  <!-- METRICS -->
  <div class="r-grid">
    <div class="r-card">
      <p class="rc-title">Performance Breakdown</p>
      ${rbar('Discipline',r.disc,'bp')}
      ${rbar('Ambition',r.amb,'bg')}
      ${rbar('Focus',r.foc,'bt')}
      ${rbar('Execution',r.exec,'bk')}
      ${rbar('Skill Growth Rate',r.grow,'bp')}
      ${rbar('Wealth Potential',r.wp,'bg')}
    </div>
    <div class="r-card">
      <p class="rc-title">Archetype Profile · ${r.arch.name}</p>
      <div class="mrow"><span class="mrow-k">Natural Strengths</span><span class="mrow-v" style="font-family:var(--font-body,Inter)">${r.arch.str}</span></div>
      <div class="mrow"><span class="mrow-k">Core Weakness</span><span class="mrow-v" style="font-family:var(--font-body,Inter)">${r.arch.weak}</span></div>
      <div style="margin-top:1rem;padding:1rem;background:rgba(123,92,240,.06);border-radius:10px;border:1px solid rgba(123,92,240,.15)">
        <p style="font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:#9D84F5;margin-bottom:.4rem">Recommended Path</p>
        <p style="font-size:.84rem;color:#9090B8;line-height:1.65">${r.arch.path}</p>
      </div>
      <div class="mrow" style="margin-top:.75rem"><span class="mrow-k">Tier</span><span class="mrow-v" style="color:${r.tier.color}">${r.tier.name}</span></div>
      <div class="mrow"><span class="mrow-k">Career Velocity</span><span class="mrow-v">${r.vel}</span></div>
      <div class="mrow"><span class="mrow-k">Risk Level</span><span class="mrow-v">${r.risk}</span></div>
      <div class="mrow"><span class="mrow-k">Global Percentile</span><span class="mrow-v">Top ${pctile(r.score)}%</span></div>
      <div class="mrow"><span class="mrow-k">Next Tier</span><span class="mrow-v">${nextTier(r.score)}</span></div>
    </div>
  </div>

  <!-- TIER MEANING -->
  <div class="r-card r-card-full">
    <p class="rc-title">What Your Tier Means</p>
    <p style="color:#9090B8;line-height:1.7;font-size:.88rem">${r.tier.meaning}</p>
  </div>

  <!-- OUTLOOK -->
  <div class="r-card r-card-full">
    <p class="rc-title">Future Projections</p>
    <div class="outlook-grid">
      <div class="outlook-cell"><p class="oc-label">12 Month Outlook</p><p class="oc-text">${r.outlook12}</p></div>
      <div class="outlook-cell"><p class="oc-label">5 Year Outlook</p><p class="oc-text">${r.outlook5}</p></div>
    </div>
  </div>

  <!-- KEY FINDINGS -->
  <div class="r-card r-card-full">
    <p class="rc-title">Full Analysis</p>
    <div class="mrow"><span class="mrow-k">Main Opportunity</span><span class="mrow-v" style="font-family:Inter;line-height:1.5">${r.opportunity}</span></div>
    <div class="mrow"><span class="mrow-k">Main Risk</span><span class="mrow-v" style="font-family:Inter;line-height:1.5">${r.mainRisk}</span></div>
    <div class="mrow"><span class="mrow-k">Critical Bottleneck</span><span class="mrow-v" style="font-family:Inter;line-height:1.5">${r.bottleneck}</span></div>
    <div class="mrow"><span class="mrow-k">Highest Leverage Action</span><span class="mrow-v" style="font-family:Inter;line-height:1.5">${r.topAction}</span></div>
  </div>

  <!-- ROADMAP -->
  <div class="r-card r-card-full">
    <p class="rc-title">Your Personal Roadmap</p>
    <ul class="rm-list">
      ${r.roadmap.map((item,i)=>`
        <li class="rm-item">
          <div class="rm-num">${String(i+1).padStart(2,'0')}</div>
          <div class="rm-text"><strong>${item.t}</strong><br/>${item.b}</div>
        </li>`).join('')}
    </ul>
  </div>

  <!-- RESOURCES — monetization anchor -->
  <div class="r-card r-card-full">
    <p class="rc-title">Recommended Resources for ${r.arch.name}</p>
    <div class="res-grid">
      ${r.resources.map(res=>`
        <a class="res-card" href="${res.url}" target="_blank" rel="noopener">
          <p class="res-type">${res.type}</p>
          <p class="res-title">${res.title}</p>
          <p class="res-desc">${res.desc}</p>
          <span class="res-cta">${res.cta}</span>
        </a>`).join('')}
    </div>
  </div>

  <!-- BOTTOM CTA -->
  <div class="r-cta-row">
    <button class="share-hero-btn sb-primary" onclick="openShare()">Share My Result</button>
    <button class="share-hero-btn sb-challenge" onclick="openShare(true)">⚡ Challenge a Friend</button>
    <button class="share-hero-btn ghost-btn" onclick="startSim()">Retake in 30 Days</button>
  </div>
  `;
}

function rbar(label,val,cls){
  return`<div class="rbar">
    <div class="rbar-head"><span>${label}</span><span>${val}%</span></div>
    <div class="rbar-track"><div class="rbar-fill ${cls}" style="--w:${val}%"></div></div>
  </div>`;
}
function pctile(s){return s>=96?1:s>=86?5:s>=76?12:s>=61?25:s>=41?45:s>=21?70:90;}
function nextTier(s){
  if(s>=96)return'Already Legendary';
  if(s>=86)return'LEGENDARY (96+)';if(s>=76)return'VISIONARY (86+)';
  if(s>=61)return'ELITE (76+)';if(s>=41)return'CHALLENGER (61+)';
  if(s>=21)return'BUILDER (41+)';return'WANDERER (21+)';
}

/* ═══════════ SHARE / CHALLENGE ═══════════ */
function openShare(challenge=false){
  if(!resultData)return;
  const r=resultData;
  const challengeUrl=`${location.origin}${location.pathname}?challenge=${r.score}&tier=${r.tier.name}&arch=${encodeURIComponent(r.arch.name)}`;
  document.getElementById('shareCardInner').innerHTML=`
    <div class="share-preview">
      <div class="sp-logo">STELARON · FUTURE POTENTIAL REPORT</div>
      <div class="sp-score grad-text">${r.score}</div>
      <div class="sp-tier">${r.tier.name}</div>
      <div class="sp-arch">${r.arch.name}</div>
      <div class="sp-stats">
        <div class="sp-stat">WEALTH <span>${r.wlabel}</span></div>
        <div class="sp-stat">VELOCITY <span>${r.vel}</span></div>
        <div class="sp-stat">DISCIPLINE <span>${r.disc}%</span></div>
        <div class="sp-stat">RISK <span>${r.risk}</span></div>
      </div>
      <div class="sp-url">stelaron.app · Top ${pctile(r.score)}% globally</div>
    </div>`;
  document.getElementById('challengeLink').value=challengeUrl;
  document.getElementById('shareModal').classList.add('open');
  if(challenge)setTimeout(()=>document.getElementById('challengeLink').select(),400);
}
function closeModal(e){
  if(!e||e.target===document.getElementById('shareModal')||e.currentTarget?.classList?.contains('modal-x'))
    document.getElementById('shareModal').classList.remove('open');
}
function getShareText(){
  const r=resultData;
  return`I just ran my Future Potential Simulation on STELARON.\n\n🌌 Score: ${r.score}/100\n🏆 Tier: ${r.tier.name}\n⚡ Archetype: ${r.arch.name}\n💰 Wealth Potential: ${r.wlabel}\n🚀 Career Velocity: ${r.vel}\n\nDiscover yours in 60 seconds: stelaron.app`;
}
function shareX(){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`,'_blank');}
function shareLinkedIn(){window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://stelaron.app')}`,'_blank');}
function shareWhatsApp(){window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`,'_blank');}
function copyResult(){
  navigator.clipboard?.writeText(getShareText()).then(()=>toast('Result copied! 🚀')).catch(()=>toast('Select and copy the text manually'));
}
function copyChallenge(){
  const inp=document.getElementById('challengeLink');
  navigator.clipboard?.writeText(inp.value).then(()=>toast('Challenge link copied! ⚡')).catch(()=>{inp.select();document.execCommand('copy');toast('Copied!');});
}

/* Handle incoming challenge links */
(function(){
  const p=new URLSearchParams(location.search);
  if(p.get('challenge')){
    const score=p.get('challenge'),tier=p.get('tier'),arch=decodeURIComponent(p.get('arch')||'');
    const banner=document.createElement('div');
    banner.style.cssText='position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:200;background:linear-gradient(135deg,rgba(240,165,0,.15),rgba(123,92,240,.1));border:1px solid rgba(240,165,0,.4);border-radius:50px;padding:.7rem 1.8rem;font-size:.85rem;color:#FFD166;white-space:nowrap;backdrop-filter:blur(10px);';
    banner.innerHTML=`⚡ You've been challenged! Beat <strong>${arch}</strong>'s score of <strong>${score}</strong>`;
    document.body.appendChild(banner);
    setTimeout(()=>banner.remove(),6000);
  }
})();

/* ═══════════ LEADERBOARD ═══════════ */
const MOCK=[
  {name:'Anonymous #1',score:97,tier:'LEGENDARY',arch:'The Titan'},
  {name:'Anonymous #2',score:94,tier:'VISIONARY',arch:'The Visionary'},
  {name:'Anonymous #3',score:91,tier:'VISIONARY',arch:'The Founder'},
  {name:'Anonymous #4',score:89,tier:'VISIONARY',arch:'The Strategist'},
  {name:'Anonymous #5',score:86,tier:'VISIONARY',arch:'The Architect'},
  {name:'Anonymous #6',score:83,tier:'ELITE',arch:'The Commander'},
  {name:'Anonymous #7',score:79,tier:'ELITE',arch:'The Innovator'},
  {name:'Anonymous #8',score:74,tier:'CHALLENGER',arch:'The Creator'},
  {name:'Anonymous #9',score:71,tier:'CHALLENGER',arch:'The Operator'},
  {name:'Anonymous #10',score:68,tier:'CHALLENGER',arch:'The Builder'},
];
function saveToLB(r){
  let lb=[];try{lb=JSON.parse(localStorage.getItem('stlb')||'[]');}catch(e){}
  lb.push({score:r.score,tier:r.tier.name,arch:r.arch.name,ts:Date.now()});
  lb=lb.slice(-50);
  try{localStorage.setItem('stlb',JSON.stringify(lb));}catch(e){}
}
function buildLeaderboard(){
  let user=[];try{user=JSON.parse(localStorage.getItem('stlb')||'[]');}catch(e){}
  const all=[...MOCK];
  user.forEach((e,i)=>all.push({name:`Your Score #${i+1}`,score:e.score,tier:e.tier,arch:e.arch,mine:true}));
  all.sort((a,b)=>b.score-a.score);
  const total=all.length||1;

  document.getElementById('lbTop').innerHTML=all.slice(0,10).map((e,i)=>`
    <div class="lb-row">
      <span class="lb-rank ${i<3?'top':''}">${i+1}</span>
      <span class="lb-name" style="${e.mine?'color:#F0A500':''}">${e.name}${e.mine?' ★':''}</span>
      <span class="lb-val">${e.score}</span>
    </div>`).join('');

  const am={};all.forEach(e=>{am[e.arch]=(am[e.arch]||0)+1;});
  document.getElementById('lbArch').innerHTML=Object.entries(am).sort((a,b)=>b[1]-a[1]).slice(0,8)
    .map(([n,c])=>`<div class="lb-row"><span class="lb-rank"></span><span class="lb-name">${n}</span><span class="lb-val">${Math.round(c/total*100)}%</span></div>`).join('');

  const tm={};all.forEach(e=>{tm[e.tier]=(tm[e.tier]||0)+1;});
  const to=['LEGENDARY','VISIONARY','ELITE','CHALLENGER','BUILDER','WANDERER','DRIFTER'];
  document.getElementById('lbTiers').innerHTML=to.filter(t=>tm[t]).map(t=>`
    <div class="lb-row"><span class="lb-rank"></span><span class="lb-name">${t}</span><span class="lb-val">${Math.round((tm[t]||0)/total*100)}%</span></div>`).join('');
}
