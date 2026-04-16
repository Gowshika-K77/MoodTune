/* ═══════════════════════════════════════════════════
   PLAYLIST.JS — Playlist page logic
═══════════════════════════════════════════════════ */
var _all      = [];
var _langTab  = 'all';
var _searchQ  = '';
var _mood     = 'happy';

var LANG_LABEL = {EN:'English', KP:'K-Pop', FR:'French+'};
var LANG_CLASS = {EN:'lang-en', KP:'lang-kp', FR:'lang-fr'};
var BANNER_GRAD = {
  happy:    '#f59e0b,#f97316', sad:      '#3b82f6,#6366f1',
  angry:    '#ef4444,#7c3aed', calm:     '#10b981,#3b82f6',
  romantic: '#ec4899,#f43f5e', nostalgic:'#f59e0b,#fb923c',
  energetic:'#f97316,#ef4444', focused:  '#6366f1,#8b5cf6'
};

window.addEventListener('DOMContentLoaded', function() {
  applyTheme(); initBg(); initNotes(); loadYT();
  var p = new URLSearchParams(window.location.search);
  _mood = p.get('mood') || sessionStorage.getItem('mt_mood') || 'happy';
  if (!DB[_mood]) _mood = 'happy';
  loadPlaylist(_mood);
});

function loadPlaylist(mood) {
  _all = DB[mood] || [];
  _filtered = _all.slice();
  _langTab = 'all'; _searchQ = '';
  var si = document.getElementById('searchInput'); if(si) si.value='';
  var meta = META[mood];

  // Badge
  var badge = document.getElementById('plBadge');
  if(badge){ badge.textContent=meta.emoji+' '+meta.label; badge.style.background=meta.color+'18'; badge.style.borderColor=meta.color; badge.style.color=meta.color; }

  // Banner
  var banner = document.getElementById('plBanner');
  if(banner) banner.style.background='linear-gradient(135deg,'+(BANNER_GRAD[mood]||'#6c3ff5,#3b82f6')+')';
  var be=document.getElementById('plBannerEmoji'), bt=document.getElementById('plBannerTitle'), bd=document.getElementById('plBannerDesc');
  if(be) be.textContent=meta.emoji; if(bt) bt.textContent=meta.label+' Vibes'; if(bd) bd.textContent=meta.desc;

  // Title/sub
  var t=document.getElementById('plTitle'), s=document.getElementById('plSub');
  if(t) t.textContent='Your '+meta.label+' Playlist';
  if(s) s.textContent=_all.length+' songs · '+meta.desc;

  // Stats
  document.getElementById('statEN').textContent = _all.filter(function(x){return x.l==='EN';}).length;
  document.getElementById('statKP').textContent = _all.filter(function(x){return x.l==='KP';}).length;
  document.getElementById('statFR').textContent = _all.filter(function(x){return x.l==='FR';}).length;

  // Mood select
  var ms=document.getElementById('moodSelect'); if(ms) ms.value=mood;

  setActiveLangTab('all');
  renderSongs();
}

function renderSongs() {
  var list = document.getElementById('songsList');
  if (!list) return;
  if (!_filtered.length) { list.innerHTML='<div class="empty-msg">No songs match your filter.</div>'; return; }
  var html='';
  _filtered.forEach(function(s,i){
    var lc=LANG_CLASS[s.l]||'lang-en', ll=LANG_LABEL[s.l]||s.l;
    var playing=(i===_curIdx);
    html+='<div class="song-row'+(playing?' playing':'')+'" onclick="playSongAt('+i+')" style="animation-delay:'+Math.min(i*.025,.4)+'s">'+
      '<div class="song-num">'+(i+1)+'</div>'+
      '<div class="eq-bars"><div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div></div>'+
      '<div class="song-emoji">'+s.e+'</div>'+
      '<div class="song-info"><div class="song-title">'+esc(s.t)+'</div><div class="song-artist">'+esc(s.a)+'</div></div>'+
      '<span class="song-lang '+lc+'">'+ll+'</span>'+
      '<span class="song-why">'+esc(s.w)+'</span>'+
      '<button class="row-play-btn" onclick="event.stopPropagation();playSongAt('+i+')" title="Play">'+
        '<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><polygon points="5,3 19,12 5,21"/></svg>'+
      '</button>'+
    '</div>';
  });
  list.innerHTML=html;
}

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function setLangTab(lang){
  _langTab=lang; setActiveLangTab(lang); applyFilters();
}
function setActiveLangTab(lang){
  ['all','EN','KP','FR'].forEach(function(k){
    var el=document.getElementById('tab-'+k);
    if(el) el.classList.toggle('active-filter', k===lang);
  });
}
function filterSongs(q){ _searchQ=(q||'').toLowerCase().trim(); applyFilters(); }
function applyFilters(){
  _filtered=_all.filter(function(s){
    var lOk=_langTab==='all'||s.l===_langTab;
    var qOk=!_searchQ||s.t.toLowerCase().includes(_searchQ)||s.a.toLowerCase().includes(_searchQ);
    return lOk&&qOk;
  });
  _curIdx=-1; renderSongs();
}
function onMoodChange(val){
  _mood=val;
  var url=new URL(window.location); url.searchParams.set('mood',val); window.history.pushState({},'',url);
  try{ sessionStorage.setItem('mt_mood',val); }catch(e){}
  loadPlaylist(val);
}
function playAll(){ if(_filtered.length) playSongAt(0); }