/* ═══════════════════════════════════════════════════
   HOME.JS — Mood selection & navigation
═══════════════════════════════════════════════════ */
var _mood = null;

function selectMood(el, mood) {
  document.querySelectorAll('.mood-card').forEach(function(c) { c.classList.remove('sel'); });
  el.classList.add('sel');
  _mood = mood;
  var meta = META[mood];
  var disp = document.getElementById('moodDisplay');
  if (disp) {
    disp.textContent = meta.emoji + ' ' + meta.label + ' selected';
    disp.classList.add('active');
    disp.style.borderColor = meta.color;
    disp.style.color = meta.color;
  }
  var btn = document.getElementById('genBtn');
  if (btn) btn.disabled = false;
}

function goToPlaylist() {
  if (!_mood) return;
  var btn  = document.getElementById('genBtn');
  var lbl  = document.getElementById('genLabel');
  var spin = document.getElementById('genSpin');
  if (btn)  btn.disabled = true;
  if (lbl)  lbl.style.display = 'none';
  if (spin) spin.style.display = 'block';

  // Store mood in sessionStorage and navigate
  try { sessionStorage.setItem('mt_mood', _mood); } catch(e){}
  setTimeout(function() {
    window.location.href = 'pages/playlist.html?mood=' + _mood;
  }, 500);
}

window.addEventListener('DOMContentLoaded', function() {
  applyTheme();
  initBg();
  initNotes();
  loadYT();
});