/* ============================================================
   script.js  —  MoodTune (No API version)
   Works 100% offline — songs stored right here in this file
   No API key needed. Just open index.html in Chrome and run!
   ============================================================ */

/* ============================================================
   SECTION 1 — Song Database (all 8 moods, 8 songs each)
   To add more songs: copy the pattern and add to any mood list
   ============================================================ */

const SONG_DB = {

  happy: {
    vibe: "These upbeat tracks will keep your smile going all day long!",
    songs: [
      { title: "Happy",                   artist: "Pharrell Williams",  why: "Pure joy in every beat"        },
      { title: "Can't Stop the Feeling",  artist: "Justin Timberlake",  why: "Impossible not to dance"       },
      { title: "Good as Hell",            artist: "Lizzo",              why: "Feel-good anthem for yourself" },
      { title: "Uptown Funk",             artist: "Mark Ronson ft. Bruno Mars", why: "Funky energy all day"  },
      { title: "Walking on Sunshine",     artist: "Katrina & The Waves", why: "Classic feel-good summer hit" },
      { title: "Shake It Off",            artist: "Taylor Swift",       why: "Shrug off negativity instantly"},
      { title: "Best Day of My Life",     artist: "American Authors",   why: "Celebrates every small win"   },
      { title: "Good Day Sunshine",       artist: "The Beatles",        why: "Timeless happiness in music"  },
    ]
  },

  sad: {
    vibe: "Sometimes you need music that truly understands how you feel.",
    songs: [
      { title: "Someone Like You",        artist: "Adele",              why: "Beautifully captures heartbreak"   },
      { title: "The Night We Met",        artist: "Lord Huron",         why: "Aching nostalgia and longing"      },
      { title: "Skinny Love",             artist: "Bon Iver",           why: "Raw emotional vulnerability"       },
      { title: "Fade Into You",           artist: "Mazzy Star",         why: "Dreamy and deeply melancholic"     },
      { title: "Mad World",               artist: "Gary Jules",         why: "Quiet sadness and reflection"      },
      { title: "Fix You",                 artist: "Coldplay",           why: "Gentle comfort through pain"       },
      { title: "Hurt",                    artist: "Johnny Cash",        why: "Profound and deeply moving"        },
      { title: "The Sound of Silence",    artist: "Simon & Garfunkel",  why: "Loneliness expressed beautifully"  },
    ]
  },

  energetic: {
    vibe: "Buckle up — these tracks will send your energy through the roof!",
    songs: [
      { title: "Eye of the Tiger",        artist: "Survivor",           why: "Ultimate power and motivation"     },
      { title: "Lose Yourself",           artist: "Eminem",             why: "Maximum focus and drive"           },
      { title: "Thunderstruck",           artist: "AC/DC",              why: "Electric guitar-fuelled energy"    },
      { title: "Jump Around",             artist: "House of Pain",      why: "Unstoppable hype energy"           },
      { title: "Stronger",               artist: "Kanye West",          why: "Push harder every rep"             },
      { title: "Till I Collapse",         artist: "Eminem",             why: "Never stop, keep going"            },
      { title: "Blinding Lights",         artist: "The Weeknd",         why: "Pulsing synths drive momentum"     },
      { title: "Power",                   artist: "Kanye West",         why: "Feels like ruling the world"       },
    ]
  },

  calm: {
    vibe: "Let these soothing sounds wash away all the noise and stress.",
    songs: [
      { title: "Weightless",              artist: "Marconi Union",      why: "Scientifically proven to relax"    },
      { title: "Clair de Lune",           artist: "Claude Debussy",     why: "Timeless peaceful piano beauty"   },
      { title: "River Flows in You",      artist: "Yiruma",             why: "Gentle and deeply soothing"        },
      { title: "Experience",              artist: "Ludovico Einaudi",   why: "Minimalist beauty, pure serenity"  },
      { title: "Sunset Lover",            artist: "Petit Biscuit",      why: "Dreamy electronic calm"            },
      { title: "4'33\"",                  artist: "John Cage",          why: "The ultimate silence experience"   },
      { title: "Gymnopédie No.1",         artist: "Erik Satie",         why: "Delicate, unhurried, effortless"   },
      { title: "Holocene",                artist: "Bon Iver",           why: "Vast and quietly beautiful"        },
    ]
  },

  romantic: {
    vibe: "These songs set the perfect mood for love and togetherness.",
    songs: [
      { title: "Perfect",                 artist: "Ed Sheeran",         why: "Written for that one person"       },
      { title: "All of Me",               artist: "John Legend",        why: "Wholehearted devotion in music"    },
      { title: "Make You Feel My Love",   artist: "Adele",              why: "Deep and genuine affection"        },
      { title: "At Last",                 artist: "Etta James",         why: "Classic timeless romance"          },
      { title: "Can't Help Falling in Love", artist: "Elvis Presley",  why: "Surrendering to love beautifully"  },
      { title: "Thinking Out Loud",       artist: "Ed Sheeran",         why: "Love that grows with time"         },
      { title: "La Vie en Rose",          artist: "Édith Piaf",         why: "Seeing life through love"          },
      { title: "Your Song",               artist: "Elton John",         why: "Simple and honestly heartfelt"     },
    ]
  },

  angry: {
    vibe: "Channel that fire into something powerful — let it all out!",
    songs: [
      { title: "Break Stuff",             artist: "Limp Bizkit",        why: "Perfectly captures raw rage"       },
      { title: "Given Up",                artist: "Linkin Park",        why: "Explosive frustration and release" },
      { title: "Killing in the Name",     artist: "Rage Against the Machine", why: "Revolt against the system" },
      { title: "Bodies",                  artist: "Drowning Pool",      why: "Unleash everything you've got"     },
      { title: "Down with the Sickness",  artist: "Disturbed",          why: "Intense and cathartic release"     },
      { title: "Du Hast",                 artist: "Rammstein",          why: "Industrial aggression at its peak" },
      { title: "Last Resort",             artist: "Papa Roach",         why: "Raw emotion without filter"        },
      { title: "Chop Suey!",             artist: "System of a Down",    why: "Chaotic energy perfectly expressed"},
    ]
  },

  focused: {
    vibe: "These tracks create the perfect mental zone to get things done.",
    songs: [
      { title: "Strobe",                  artist: "deadmau5",           why: "Long build keeps you locked in"    },
      { title: "Get Lucky",               artist: "Daft Punk",          why: "Steady rhythm aids concentration"  },
      { title: "Intro",                   artist: "The xx",             why: "Minimal, perfect for deep work"    },
      { title: "Comptine d'un autre été", artist: "Yann Tiersen",       why: "Focused piano for creative minds"  },
      { title: "Time",                    artist: "Hans Zimmer",        why: "Epic backdrop for important tasks" },
      { title: "Interstellar Main Theme", artist: "Hans Zimmer",        why: "Expansive focus and clarity"       },
      { title: "Teardrop",                artist: "Massive Attack",     why: "Hypnotic groove aids deep focus"   },
      { title: "One More Time",           artist: "Daft Punk",          why: "Repetitive beat entrains the mind" },
    ]
  },

  nostalgic: {
    vibe: "Close your eyes and let these songs take you back in time.",
    songs: [
      { title: "Yesterday",               artist: "The Beatles",        why: "Longing for simpler times"         },
      { title: "The Way We Were",         artist: "Barbra Streisand",   why: "Memories wrapped in melody"        },
      { title: "Summer of '69",           artist: "Bryan Adams",        why: "Youth captured forever in music"   },
      { title: "Bohemian Rhapsody",       artist: "Queen",              why: "Timeless classic never grows old"  },
      { title: "Don't You (Forget About Me)", artist: "Simple Minds",   why: "Every 80s memory in one song"     },
      { title: "Africa",                  artist: "Toto",               why: "Pure 80s nostalgia rush"           },
      { title: "Take On Me",              artist: "a-ha",               why: "Instantly teleports you to 1985"   },
      { title: "Sweet Child O' Mine",     artist: "Guns N' Roses",      why: "That iconic riff triggers memories"},
    ]
  }

};

/* ============================================================
   SECTION 2 — Canvas setup
   ============================================================ */

const bg = document.getElementById('bgCanvas');
const bx = bg.getContext('2d');
const nc = document.getElementById('noteCanvas');
const nx = nc.getContext('2d');

let W, H;

function resize() {
  W = bg.width  = nc.width  = window.innerWidth;
  H = bg.height = nc.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ============================================================
   SECTION 3 — Aurora blobs
   ============================================================ */

const blobs = [
  { x: 0.15, y: 0.25, r: 0.38, col: 'rgba(124,58,237,',  s: 0.00045 },
  { x: 0.75, y: 0.60, r: 0.42, col: 'rgba(37,99,235,',   s: 0.00032 },
  { x: 0.50, y: 0.80, r: 0.32, col: 'rgba(16,185,129,',  s: 0.00055 },
  { x: 0.85, y: 0.15, r: 0.30, col: 'rgba(167,139,250,', s: 0.00040 },
];

/* ============================================================
   SECTION 4 — Star particles
   ============================================================ */

class Star {
  constructor() { this.reset(true); }

  reset(init) {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.4 + 0.3;
    this.op   = Math.random() * 0.5 + 0.1;
    this.vx   = (Math.random() - 0.5) * 0.15;
    this.vy   = (Math.random() - 0.5) * 0.15;
    this.life = 0;
    this.max  = Math.random() * 500 + 200;
    if (init) this.life = Math.random() * this.max;
  }

  tick() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.max) this.reset();
  }

  draw() {
    const fade = 1 - this.life / this.max;
    bx.beginPath();
    bx.arc(this.x, this.y, this.r, 0, 6.28);
    bx.fillStyle = `rgba(255,255,255,${this.op * fade})`;
    bx.fill();
  }
}

const stars = Array.from({ length: 140 }, () => new Star());

/* ============================================================
   SECTION 5 — Floating music notes
   ============================================================ */

const NOTES = ['♩', '♪', '♫', '♬'];

const moodColors = {
  happy:     '#facc15',
  sad:       '#60a5fa',
  energetic: '#f97316',
  calm:      '#34d399',
  romantic:  '#f472b6',
  angry:     '#ef4444',
  focused:   '#818cf8',
  nostalgic: '#fb923c',
  default:   '#a78bfa',
};

let activeMood = 'default';

class MNote {
  constructor(scatter) {
    this.scatter = scatter || false;
    this.spawn();
  }

  spawn() {
    this.x   = Math.random() * W;
    this.y   = this.scatter ? Math.random() * H : H + 30;
    this.char = NOTES[Math.floor(Math.random() * NOTES.length)];
    this.sz  = Math.random() * 16 + 9;
    this.op  = this.scatter ? Math.random() * 0.3 + 0.05 : Math.random() * 0.4 + 0.08;
    this.vx  = (Math.random() - 0.5) * 0.35;
    this.vy  = this.scatter ? -(Math.random() * 0.5 + 0.2) : -(Math.random() * 0.55 + 0.25);
    this.wb  = Math.random() * Math.PI * 2;
    this.ws  = Math.random() * 0.022 + 0.007;
  }

  tick() {
    this.wb += this.ws;
    this.x  += this.vx + Math.sin(this.wb) * 0.35;
    this.y  += this.vy;
    if (this.y < -40) this.spawn();
  }

  draw() {
    const col = moodColors[activeMood] || moodColors.default;
    nx.save();
    nx.font        = `${this.sz}px Arial`;
    nx.fillStyle   = col;
    nx.globalAlpha = this.op;
    nx.translate(this.x, this.y);
    nx.fillText(this.char, 0, 0);
    nx.restore();
  }
}

const mnotes = Array.from({ length: 30 }, () => new MNote(true) );

/* ============================================================
   SECTION 6 — Main animation loop
   ============================================================ */

let t = 0;

function loop() {
  bx.clearRect(0, 0, W, H);
  t += 0.011;

  // Aurora
  blobs.forEach((b, i) => {
    const px = W * (b.x + 0.07 * Math.sin(t * b.s * 900  + i * 1.8));
    const py = H * (b.y + 0.05 * Math.cos(t * b.s * 1100 + i * 2.4));
    const rr = Math.min(W, H) * b.r;
    const g  = bx.createRadialGradient(px, py, 0, px, py, rr);
    g.addColorStop(0,   b.col + '0.13)');
    g.addColorStop(0.5, b.col + '0.06)');
    g.addColorStop(1,   b.col + '0)');
    bx.fillStyle = g;
    bx.beginPath();
    bx.arc(px, py, rr, 0, 6.28);
    bx.fill();
  });

  // Stars
  stars.forEach(s => { s.tick(); s.draw(); });

  // Notes
  nx.clearRect(0, 0, W, H);
  mnotes.forEach(n => { n.tick(); n.draw(); });

  requestAnimationFrame(loop);
}

loop();

/* ============================================================
   SECTION 7 — Mood card click
   ============================================================ */

let mood = null;

function pick(el, m) {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  mood       = m;
  activeMood = m;
  document.getElementById('btn').disabled = false;

  // Burst notes from card
  const rc = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const n  = new MNote();
    n.x      = rc.left + rc.width  / 2 + (Math.random() - 0.5) * 60;
    n.y      = rc.top  + rc.height / 2 + (Math.random() - 0.5) * 20;
    n.vy     = -(Math.random() * 2.5 + 1);
    n.op     = 0.9;
    n.sz     = 22;
    mnotes.push(n);
    setTimeout(() => {
      const idx = mnotes.indexOf(n);
      if (idx > -1) mnotes.splice(idx, 1);
    }, 3500);
  }
}

/* ============================================================
   SECTION 8 — Generate playlist (no API — uses local database)
   ============================================================ */

function go() {
  if (!mood) return;

  const btn = document.getElementById('btn');
  const bl  = document.getElementById('bl');
  const sp  = document.getElementById('sp');
  const res = document.getElementById('results');

  // Show fake loading for 0.8s so it feels real
  btn.disabled     = true;
  bl.style.display = 'none';
  sp.style.display = 'block';
  res.innerHTML    = '';

  setTimeout(() => {
    // Get songs from local database
    const data = SONG_DB[mood];
    render(data);

    // Restore button
    btn.disabled     = false;
    bl.style.display = 'inline';
    sp.style.display = 'none';
  }, 800);
}

/* ============================================================
   SECTION 9 — Render results
   ============================================================ */

const moodEmoji = {
  happy: '😄', sad: '😢', energetic: '⚡', calm: '🌊',
  romantic: '❤️', angry: '😤', focused: '🎯', nostalgic: '🌅',
};

function render({ vibe, songs }) {
  const res      = document.getElementById('results');
  const emoji    = moodEmoji[mood] || '🎵';
  const moodName = mood.charAt(0).toUpperCase() + mood.slice(1);

  res.className = 'res';
  res.innerHTML = `
    <p class="sec-h">${emoji} Your ${moodName} Playlist</p>
    <div class="songs">
      ${songs.map((s, i) => `
        <div class="song" style="animation-delay:${i * 55}ms">
          <span class="snum">${String(i + 1).padStart(2, '0')}</span>
          <div class="sinfo">
            <div class="stitle">${s.title}</div>
            <div class="sartist">${s.artist}</div>
          </div>
          <span class="swhy">${s.why}</span>
        </div>
      `).join('')}
    </div>
    <div class="vibe">
      <strong>🎧 Vibe check:</strong> ${vibe}
    </div>
  `;
}