/* ═══════════════════════════════════════════════════
   THEME.JS — Dark / Light mode toggle
═══════════════════════════════════════════════════ */
var _dark = true;

function toggleTheme() {
  _dark = !_dark;
  document.body.classList.toggle('light', !_dark);
  localStorage.setItem('mt_theme', _dark ? 'dark' : 'light');
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = _dark ? '🌙' : '☀️';
}

function applyTheme() {
  var saved = localStorage.getItem('mt_theme');
  if (saved === 'light') {
    _dark = false;
    document.body.classList.add('light');
  }
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = _dark ? '🌙' : '☀️';
}