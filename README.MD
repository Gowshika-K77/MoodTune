# 🎵 MoodTune — Feel the Music

A mood-based music web app with Tamil · English · K-Pop playlists.  
Spotify-style player, 200 songs, 8 moods, 3 languages.

---

## 📁 Project Structure

```
moodtune/
├── index.html              ← Home page (mood selector)
├── pages/
│   ├── playlist.html       ← Playlist player page
│   ├── library.html        ← Full library browser
│   ├── search.html         ← Global search
│   └── about.html          ← About page
├── css/
│   ├── base.css            ← Shared styles (nav, player bar, songs)
│   ├── home.css            ← Mood grid & hero
│   └── playlist.css        ← Playlist page banner styles
├── js/
│   ├── db.js               ← 200-song database
│   ├── player.js           ← YouTube IFrame API player
│   ├── theme.js            ← Dark/Light mode
│   ├── bg.js               ← Canvas animations
│   ├── home.js             ← Home page logic
│   └── playlist.js         ← Playlist page logic
├── Jenkinsfile             ← CI/CD pipeline
├── nginx.conf              ← Web server config
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Local)

Just open `index.html` in a browser. No build step needed.

> **Note:** YouTube playback requires serving over `http://` or `https://` (not `file://`).  
> Use a local server:
```bash
# Python (built-in)
python3 -m http.server 8080
# Then open: http://localhost:8080

# OR Node.js
npx serve .
```

---

## 🔧 Git Setup

### 1. Initialize repository

```bash
cd moodtune/
git init
git add .
git commit -m "Initial commit: MoodTune v1.0"
```

### 2. Push to GitHub/GitLab

```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/moodtune.git
git branch -M main
git push -u origin main
```

### 3. Branch strategy

```bash
git checkout -b develop        # Development branch
git checkout -b feature/search # Feature branches
```

---

## ⚙️ Jenkins CI/CD Setup

### Prerequisites
- Jenkins installed (https://www.jenkins.io/doc/book/installing/)
- Git plugin installed in Jenkins
- Pipeline plugin installed in Jenkins

### Step 1: Install Jenkins

```bash
# Ubuntu/Debian
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Step 2: Create Pipeline Job in Jenkins

1. Open Jenkins at `http://YOUR_SERVER:8080`
2. Click **New Item** → **Pipeline**
3. Name it: `moodtune-pipeline`
4. Under **Pipeline** → **Definition** → select **Pipeline script from SCM**
5. Set SCM = **Git**, Repository URL = your GitHub repo URL
6. Branch = `*/main`
7. Script Path = `Jenkinsfile`
8. Save & Build Now

### Step 3: Configure GitHub Webhook (auto-trigger)

In your GitHub repo → **Settings** → **Webhooks** → **Add webhook**:
- Payload URL: `http://YOUR_JENKINS:8080/github-webhook/`
- Content type: `application/json`
- Events: **Just the push event**

Now every `git push` auto-triggers the pipeline!

### Pipeline Stages

| Stage | Branch | What it does |
|-------|--------|-------------|
| Checkout | all | Pulls latest code from Git |
| Lint & Validate | all | Checks HTML structure & file integrity |
| Test | all | Validates all required files & DB structure |
| Build | all | Copies to `build/` with cache-busting |
| Deploy Staging | `develop` | Deploys to `/var/www/staging/moodtune` |
| Deploy Production | `main` | Requires manual approval, deploys to prod |

---

## 🌐 Nginx Setup

### Install Nginx

```bash
sudo apt install nginx
```

### Configure MoodTune site

```bash
sudo cp nginx.conf /etc/nginx/sites-available/moodtune
sudo ln -s /etc/nginx/sites-available/moodtune /etc/nginx/sites-enabled/
sudo nginx -t          # Test config
sudo systemctl reload nginx
```

### Give Jenkins deploy permission

```bash
# Create deploy directory
sudo mkdir -p /var/www/html/moodtune
sudo chown jenkins:jenkins /var/www/html/moodtune

# Allow Jenkins to reload nginx (add to sudoers)
echo "jenkins ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx, /bin/rsync" | sudo tee /etc/sudoers.d/jenkins-nginx
```

### SSL with Let's Encrypt (optional)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d moodtune.yourdomain.com
```

---

## 🔁 Full Deploy Workflow

```
Developer pushes code
        ↓
GitHub receives push
        ↓
Webhook triggers Jenkins
        ↓
Jenkins: Checkout → Lint → Test → Build
        ↓
  If branch=develop → Deploy to Staging
  If branch=main    → Manual approval → Deploy to Production
        ↓
Nginx serves the app
        ↓
Users access MoodTune 🎵
```

---

## 🐛 Troubleshooting

### Songs not playing?
- Must be on `http://localhost` or `https://` — not `file://`
- YouTube blocks some videos by region (app auto-skips)
- Open browser console (F12) to see any errors

### YouTube API not loading?
- Check network connection
- YouTube IFrame API requires internet access
- Some corporate networks block YouTube

### Jenkins can't deploy?
- Check file permissions: `sudo chown jenkins:jenkins /var/www/html/moodtune`
- Check sudoers entry for jenkins
- Run pipeline manually to see error logs

---

## 📝 License

MIT — Free to use and modify.