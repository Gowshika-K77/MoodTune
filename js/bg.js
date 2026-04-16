/* ═══════════════════════════════════════════════════
   BG.JS — Stars, Aurora, Orbs + Floating Notes
═══════════════════════════════════════════════════ */

/* ── Background Canvas ── */
function initBg() {
  var cv = document.getElementById('bgCanvas');
  if (!cv) return;
  var ctx = cv.getContext('2d'), W, H, orbs = [], stars = [], t = 0;

  function rsz() { W = cv.width = innerWidth; H = cv.height = innerHeight; mkStars(); }
  function mkStars() {
    stars = [];
    for (var i = 0; i < 140; i++) {
      stars.push({ x: Math.random()*W, y: Math.random()*H, r: .3+Math.random()*1.3, a: Math.random(), s: .002+Math.random()*.005, ph: Math.random()*6.28 });
    }
  }
  function mkOrbs() {
    orbs = [];
    [[260,340],[210,290],[300,270],[180,360],[240,300],[320,260],[200,315]].forEach(function(c) {
      orbs.push({ x: Math.random()*W, y: Math.random()*H, r: c[1]+Math.random()*110, vx: (Math.random()-.5)*.27, vy: (Math.random()-.5)*.27, hue: c[0], hs: .07+Math.random()*.07, p: Math.random()*6.28 });
    });
  }
  function waves() {
    for (var j = 0; j < 4; j++) {
      ctx.beginPath();
      var by = H*(.2+j*.22);
      ctx.moveTo(0, by);
      for (var i = 0; i <= 14; i++) ctx.lineTo(W/14*i, by+Math.sin(t*.35+i*.65+j*1.8)*55+Math.cos(t*.18+i*.45)*28);
      ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
      var hue = 215+j*28+Math.sin(t*.25)*18;
      var g = ctx.createLinearGradient(0,by-90,0,by+90);
      g.addColorStop(0,'hsla('+hue+',65%,55%,0)');
      g.addColorStop(.5,'hsla('+hue+',65%,55%,.032)');
      g.addColorStop(1,'hsla('+hue+',65%,55%,0)');
      ctx.fillStyle = g; ctx.fill();
    }
  }
  function draw() {
    ctx.clearRect(0,0,W,H); t += .01;
    stars.forEach(function(s) {
      s.a += s.s*(Math.sin(t*1.8+s.ph)>0?1:-1);
      s.a = Math.max(.03, Math.min(.7, s.a));
      ctx.globalAlpha = s.a; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.28); ctx.fill();
    });
    ctx.globalAlpha = 1;
    waves();
    orbs.forEach(function(o) {
      o.p += .018;
      var pr = o.r+Math.sin(o.p)*35;
      var g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,pr);
      g.addColorStop(0,'hsla('+o.hue+',85%,65%,.1)');
      g.addColorStop(.5,'hsla('+o.hue+',75%,60%,.045)');
      g.addColorStop(1,'transparent');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x,o.y,pr,0,6.28); ctx.fill();
      o.x += o.vx; o.y += o.vy; o.hue += o.hs;
      if (o.x<-o.r) o.x=W+o.r; if (o.x>W+o.r) o.x=-o.r;
      if (o.y<-o.r) o.y=H+o.r; if (o.y>H+o.r) o.y=-o.r;
    });
    ctx.strokeStyle = 'rgba(108,63,245,.02)'; ctx.lineWidth = 1;
    for (var gx=0; gx<W; gx+=90) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke(); }
    for (var gy=0; gy<H; gy+=90) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke(); }
    requestAnimationFrame(draw);
  }
  rsz(); mkOrbs(); draw();
  window.addEventListener('resize', function() { rsz(); mkOrbs(); });
}

/* ── Floating Notes Canvas ── */
function initNotes() {
  var cv = document.getElementById('noteCanvas');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var ns  = ['♩','♪','♫','♬','🎵','🎶'];
  var cs  = ['#a78bfa','#60a5fa','#34d399','#f472b6','#fb923c','#facc15'];
  var W, H, ps = [];

  function rsz() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  function spawn() {
    var bot = Math.random() < .72;
    var p = { n:ns[~~(Math.random()*ns.length)], c:cs[~~(Math.random()*cs.length)], sz:13+Math.random()*20, sp:.3+Math.random(), dr:(Math.random()-.5)*.65, ro:Math.random()*6.28, rs:(Math.random()-.5)*.045, a:0, fade:'in', tr:[] };
    if (bot) { p.x = 40+Math.random()*(W-80); p.y = H+30; }
    else { p.x = Math.random()<.5?-30:W+30; p.y = Math.random()*H; p.sp *= .45; p.dr = p.x<0?.55:-.55; }
    ps.push(p);
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    if (Math.random()<.02 && ps.length<65) spawn();
    ps.forEach(function(p) {
      p.tr.push({x:p.x,y:p.y,a:p.a*.28});
      if (p.tr.length>9) p.tr.shift();
      p.tr.forEach(function(tr,ti) {
        ctx.globalAlpha = tr.a*(ti/p.tr.length)*.4;
        ctx.font = (p.sz*.65)+'px serif'; ctx.fillStyle = p.c; ctx.fillText(p.n,tr.x,tr.y);
      });
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.ro);
      ctx.globalAlpha = p.a; ctx.font = p.sz+'px serif'; ctx.fillStyle = p.c;
      ctx.shadowColor = p.c; ctx.shadowBlur = 10;
      ctx.fillText(p.n, -p.sz/4, 0); ctx.restore();
      p.y -= p.sp; p.x += p.dr; p.ro += p.rs;
      if (p.fade==='in') { p.a = Math.min(p.a+.022,.58); if (p.a>=.58) p.fade='out'; }
      else { p.a = Math.max(p.a-.005, 0); }
    });
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ps = ps.filter(function(p) { return p.a>0; });
    requestAnimationFrame(draw);
  }
  rsz(); draw();
  window.addEventListener('resize', rsz);
}