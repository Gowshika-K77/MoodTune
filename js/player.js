/* ═══════════════════════════════════════════════════
   PLAYER.JS — Clean Spotify-style YouTube player
   Works by embedding a VISIBLE iframe in the
   player bar, which satisfies Chrome autoplay policy.
═══════════════════════════════════════════════════ */

var _curIdx    = -1;
var _filtered  = [];
var _isPlaying = false;
var _yt        = null;
var _ytReady   = false;
var _pendingId = null;
var _vol       = 80;
var _timer     = null;
var _skips     = 0;

/* ───────────────────────────────────────────────────
   BOOT — called once on DOMContentLoaded
─────────────────────────────────────────────────── */
function loadYT() {
  _setupCover();
  var s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
}

/* Replace the emoji cover div with a YouTube iframe container */
function _setupCover() {
  var cover = document.getElementById('pbCover');
  if (!cover) return;
  cover.innerHTML = '';
  cover.style.cssText = 'width:46px;height:46px;border-radius:10px;flex-shrink:0;position:relative;overflow:hidden;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 4px 16px rgba(108,63,245,.4);';

  /* The actual div YT will replace with an iframe */
  var yt = document.createElement('div');
  yt.id  = 'ytPlayer';
  yt.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
  document.body.appendChild(yt);  /* NOT inside cover — body-level so Chrome sees it */

  /* Visible emoji on top of cover */
  var em = document.createElement('div');
  em.id  = 'coverEmoji';
  em.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem;z-index:2;';
  em.textContent = '🎵';
  cover.appendChild(em);
}

/* YouTube API calls this when ready */
window.onYouTubeIframeAPIReady = function() {
  _yt = new YT.Player('ytPlayer', {
    height: '1',
    width:  '1',
    playerVars: {
      autoplay:       0,
      controls:       0,
      rel:            0,
      showinfo:       0,
      modestbranding: 1,
      playsinline:    1,
      enablejsapi:    1,
      origin:         window.location.origin
    },
    events: {
      onReady:       _onReady,
      onStateChange: _onState,
      onError:       _onError
    }
  });
};

function _onReady(e) {
  _ytReady = true;
  e.target.setVolume(_vol);
  if (_pendingId) { _load(_pendingId); _pendingId = null; }
}

/* ───────────────────────────────────────────────────
   LOAD & PLAY
─────────────────────────────────────────────────── */
function _load(id) {
  if (!_ytReady || !_yt) { _pendingId = id; return; }
  _yt.loadVideoById({ videoId: id });
}

function _onState(e) {
  switch (e.data) {
    case YT.PlayerState.PLAYING:
      _isPlaying = true; _skips = 0;
      _setBuf(false); _syncBtn(); _startProg();
      _setEmoji(_filtered[_curIdx] ? _filtered[_curIdx].e : '▶');
      break;
    case YT.PlayerState.PAUSED:
      _isPlaying = false; _syncBtn(); _stopProg(); break;
    case YT.PlayerState.BUFFERING:
      _setBuf(true); break;
    case YT.PlayerState.ENDED:
      _isPlaying = false; playNext(); break;
    case YT.PlayerState.CUED:
      _yt.playVideo(); break;
    case -1:
      setTimeout(function(){ try{ _yt.playVideo(); }catch(x){} }, 300); break;
  }
}

function _onError(e) {
  console.warn('YT error:', e.data);
  _skips++;
  if (_skips > 6) {
    showToast('⚠️ Several songs blocked. Continuing…'); _skips = 0;
  } else {
    var name = _filtered[_curIdx] ? _filtered[_curIdx].t : 'Song';
    showToast('⏭ "' + name + '" unavailable. Skipping…');
  }
  setTimeout(playNext, 1500);
}

/* ───────────────────────────────────────────────────
   PUBLIC API
─────────────────────────────────────────────────── */
function playSongAt(idx) {
  var song = _filtered[idx];
  if (!song) return;
  _curIdx = idx;

  var el;
  el = document.getElementById('pbTitle');  if (el) el.textContent = song.t;
  el = document.getElementById('pbArtist'); if (el) el.textContent = song.a;
  el = document.getElementById('playerBar'); if (el) el.classList.add('up');
  _setEmoji(song.e || '🎵');
  _highlightRow(idx);
  _resetProg();

  if (_ytReady && _yt) { _load(song.id); }
  else { _pendingId = song.id; }

  try { sessionStorage.setItem('mt_playing', JSON.stringify({idx:idx,song:song})); } catch(x){}
}

function playNext() {
  if (!_filtered.length) return;
  playSongAt((_curIdx + 1) % _filtered.length);
}

function playPrev() {
  if (!_filtered.length) return;
  try { if (_yt && _yt.getCurrentTime() > 4) { _yt.seekTo(0,true); return; } } catch(x){}
  playSongAt((_curIdx - 1 + _filtered.length) % _filtered.length);
}

function togglePlay() {
  if (!_ytReady || !_yt) { if (_filtered.length) playSongAt(0); return; }
  try {
    var s = _yt.getPlayerState();
    if      (s === YT.PlayerState.PLAYING) _yt.pauseVideo();
    else if (s === YT.PlayerState.PAUSED)  _yt.playVideo();
    else if (_curIdx >= 0)                 _yt.playVideo();
    else if (_filtered.length)             playSongAt(0);
  } catch(e) {}
}

function setVol(v) {
  _vol = +v;
  if (_yt && _ytReady) { try { _yt.setVolume(_vol); } catch(e){} }
}

function onSeek(ev) {
  var t = document.getElementById('progressTrack');
  if (!t || !_yt || !_ytReady) return;
  var r = t.getBoundingClientRect();
  var p = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
  try { var d = _yt.getDuration(); if (d > 0) _yt.seekTo(p * d, true); } catch(e){}
}

function shuffleAndPlay() {
  if (!_filtered.length) return;
  var i = Math.floor(Math.random() * _filtered.length);
  playSongAt(i);
  showToast('🔀 ' + _filtered[i].t + ' — ' + _filtered[i].a);
}

/* ───────────────────────────────────────────────────
   PROGRESS BAR
─────────────────────────────────────────────────── */
function _startProg() {
  _stopProg();
  _timer = setInterval(function(){
    if (!_yt || !_ytReady) return;
    try {
      var cur = _yt.getCurrentTime()||0, dur = _yt.getDuration()||0;
      var pct = dur ? cur/dur*100 : 0;
      var f=document.getElementById('progressFill'), k=document.getElementById('progressKnob');
      var tc=document.getElementById('timeCur'), td=document.getElementById('timeDur');
      if(f) f.style.width=pct+'%';
      if(k) k.style.left=pct+'%';
      if(tc) tc.textContent=_fmt(cur);
      if(td) td.textContent=_fmt(dur);
    } catch(e){}
  }, 500);
}
function _stopProg() { clearInterval(_timer); _timer = null; }
function _resetProg() {
  var f=document.getElementById('progressFill'), k=document.getElementById('progressKnob');
  var tc=document.getElementById('timeCur'), td=document.getElementById('timeDur');
  if(f) f.style.width='0%'; if(k) k.style.left='0%';
  if(tc) tc.textContent='0:00'; if(td) td.textContent='0:00';
}
function _fmt(s) {
  if(!s||isNaN(s)) return '0:00';
  var m=Math.floor(s/60), sec=Math.floor(s%60);
  return m+':'+(sec<10?'0':'')+sec;
}

/* ───────────────────────────────────────────────────
   UI HELPERS
─────────────────────────────────────────────────── */
var _SVG_PLAY  = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>';
var _SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
var _SVG_SPIN  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18" style="animation:_spin .7s linear infinite"><path d="M12 2a10 10 0 1 0 4 19"/></svg>';

function _syncBtn() {
  var b = document.getElementById('ctrlPlay');
  if (b) b.innerHTML = _isPlaying ? _SVG_PAUSE : _SVG_PLAY;
}
function _setBuf(on) {
  var b = document.getElementById('ctrlPlay');
  if (b) b.innerHTML = on ? _SVG_SPIN : (_isPlaying ? _SVG_PAUSE : _SVG_PLAY);
}
function _setEmoji(e) {
  var el = document.getElementById('coverEmoji');
  if (el) el.textContent = e || '🎵';
}
function _highlightRow(idx) {
  document.querySelectorAll('.song-row').forEach(function(el, i) {
    el.classList.toggle('playing', i === idx);
  });
}
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(function(){ t.classList.remove('show'); }, 3500);
}

/* inject spin keyframe once */
!document.getElementById('_spinStyle') && (function(){
  var s = document.createElement('style');
  s.id = '_spinStyle';
  s.textContent = '@keyframes _spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
})();