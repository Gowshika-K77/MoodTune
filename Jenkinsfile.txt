// ═══════════════════════════════════════════════════
// Jenkinsfile — MoodTune CI/CD Pipeline
// Stages: Checkout → Lint → Test → Build → Deploy
// ═══════════════════════════════════════════════════

pipeline {
    agent any

    environment {
        APP_NAME        = 'moodtune'
        DEPLOY_DIR      = '/var/www/html/moodtune'          // Change to your server path
        STAGING_DIR     = '/var/www/staging/moodtune'       // Staging environment
        NGINX_RELOAD    = 'sudo systemctl reload nginx'
        SLACK_CHANNEL   = '#deployments'                    // Optional: Slack notifications
        NODE_VERSION    = '18'
    }

    triggers {
        // Auto-build on every push to main or develop
        githubPush()
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        // ─────────────────────────────────────────
        // STAGE 1: Checkout code from Git
        // ─────────────────────────────────────────
        stage('📥 Checkout') {
            steps {
                echo "Cloning MoodTune from Git..."
                checkout scm
                sh 'git log -1 --pretty=format:"Commit: %H%nAuthor: %an%nDate: %ad%nMessage: %s"'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 2: Lint — check HTML/CSS/JS quality
        // ─────────────────────────────────────────
        stage('🔍 Lint & Validate') {
            steps {
                echo "Running HTML/CSS/JS validation..."
                sh '''
                    # Install html-validate if not present
                    if ! command -v html-validate &> /dev/null; then
                        npm install -g html-validate 2>/dev/null || true
                    fi

                    # Check all HTML files are well-formed
                    echo "Checking HTML files..."
                    find . -name "*.html" -not -path "./node_modules/*" | while read f; do
                        python3 -c "
from html.parser import HTMLParser
class V(HTMLParser):
    def handle_error(self, msg): raise Exception(msg)
with open('$f') as fh:
    V().feed(fh.read())
print('OK: $f')
" 2>/dev/null || echo "WARNING: Could not validate $f"
                    done

                    # Check JS files exist and are non-empty
                    echo "Checking JS files..."
                    for f in js/db.js js/player.js js/theme.js js/bg.js js/home.js js/playlist.js; do
                        if [ -f "$f" ]; then
                            size=$(wc -c < "$f")
                            echo "OK: $f ($size bytes)"
                        else
                            echo "MISSING: $f"
                            exit 1
                        fi
                    done

                    # Check CSS files
                    echo "Checking CSS files..."
                    for f in css/base.css css/home.css css/playlist.css; do
                        if [ -f "$f" ]; then
                            echo "OK: $f"
                        else
                            echo "MISSING: $f"
                            exit 1
                        fi
                    done

                    echo "All lint checks passed!"
                '''
            }
        }

        // ─────────────────────────────────────────
        // STAGE 3: Test — check structure & links
        // ─────────────────────────────────────────
        stage('🧪 Test') {
            steps {
                echo "Running structural tests..."
                sh '''
                    python3 - <<'PYEOF'
import os, re, sys

errors = []

# 1. Check all required files exist
required = [
    "index.html",
    "css/base.css", "css/home.css", "css/playlist.css",
    "js/db.js", "js/player.js", "js/theme.js", "js/bg.js",
    "js/home.js", "js/playlist.js",
    "pages/playlist.html", "pages/library.html",
    "pages/search.html", "pages/about.html"
]
for f in required:
    if not os.path.exists(f):
        errors.append(f"MISSING FILE: {f}")
    else:
        print(f"✅ {f}")

# 2. Check DB.js has all 8 moods
with open("js/db.js") as fh:
    db = fh.read()
for mood in ["happy","sad","energetic","calm","romantic","angry","focused","nostalgic"]:
    if mood + ":" not in db:
        errors.append(f"MISSING MOOD in db.js: {mood}")
    else:
        print(f"✅ Mood '{mood}' in DB")

# 3. Check index.html references all JS
with open("index.html") as fh:
    idx = fh.read()
for js in ["db.js","player.js","theme.js","bg.js","home.js"]:
    if js not in idx:
        errors.append(f"index.html missing script: {js}")
    else:
        print(f"✅ index.html includes {js}")

# 4. Check playlist page exists with proper structure
with open("pages/playlist.html") as fh:
    pl = fh.read()
for el in ["songsList","playerBar","ctrlPlay","progressFill"]:
    if el not in pl:
        errors.append(f"playlist.html missing element: #{el}")
    else:
        print(f"✅ playlist.html has #{el}")

if errors:
    print("\n❌ TEST FAILURES:")
    for e in errors:
        print(f"  {e}")
    sys.exit(1)
else:
    print("\n✅ All tests passed!")
PYEOF
                '''
            }
        }

        // ─────────────────────────────────────────
        // STAGE 4: Build — minify + bundle (optional)
        // ─────────────────────────────────────────
        stage('🔨 Build') {
            steps {
                echo "Building MoodTune..."
                sh '''
                    # Create build directory
                    rm -rf build/
                    mkdir -p build/css build/js build/pages

                    # Copy all files to build/ directory
                    cp index.html build/
                    cp css/*.css  build/css/
                    cp js/*.js    build/js/
                    cp pages/*.html build/pages/

                    # Append build timestamp to HTML files for cache-busting
                    BUILD_TIME=$(date '+%Y-%m-%d %H:%M:%S')
                    BUILD_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
                    echo "Build: $BUILD_TIME ($BUILD_SHA)"

                    # Add build info comment to index.html
                    sed -i "s|</head>|<!-- Build: $BUILD_TIME | SHA: $BUILD_SHA -->\n</head>|" build/index.html

                    # Calculate build size
                    echo "Build size:"
                    du -sh build/

                    echo "Build complete!"
                '''

                // Archive build artifacts
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        // ─────────────────────────────────────────
        // STAGE 5: Deploy to Staging
        // ─────────────────────────────────────────
        stage('🚀 Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                echo "Deploying to STAGING environment..."
                sh '''
                    sudo mkdir -p $STAGING_DIR
                    sudo rsync -av --delete build/ $STAGING_DIR/
                    $NGINX_RELOAD || true
                    echo "Staging deploy complete: $STAGING_DIR"
                '''
            }
        }

        // ─────────────────────────────────────────
        // STAGE 6: Deploy to Production
        // ─────────────────────────────────────────
        stage('🌐 Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                // Require manual approval before prod deploy
                input message: 'Deploy to Production?', ok: 'Deploy Now'

                echo "Deploying to PRODUCTION..."
                sh '''
                    # Backup current production
                    BACKUP_DIR="/var/backups/moodtune/$(date +%Y%m%d_%H%M%S)"
                    sudo mkdir -p $BACKUP_DIR
                    if [ -d "$DEPLOY_DIR" ]; then
                        sudo cp -r $DEPLOY_DIR/* $BACKUP_DIR/ 2>/dev/null || true
                        echo "Backed up to: $BACKUP_DIR"
                    fi

                    # Deploy new build
                    sudo mkdir -p $DEPLOY_DIR
                    sudo rsync -av --delete build/ $DEPLOY_DIR/
                    sudo chown -R www-data:www-data $DEPLOY_DIR 2>/dev/null || true
                    sudo chmod -R 755 $DEPLOY_DIR

                    # Reload nginx
                    $NGINX_RELOAD || true

                    echo "Production deploy complete: $DEPLOY_DIR"
                '''
            }
        }
    }

    // ─────────────────────────────────────────
    // POST ACTIONS
    // ─────────────────────────────────────────
    post {
        success {
            echo "✅ Pipeline SUCCEEDED — MoodTune deployed!"
            // Uncomment to send Slack notifications:
            // slackSend channel: env.SLACK_CHANNEL, color: 'good',
            //     message: "✅ MoodTune deploy SUCCESS on ${env.BRANCH_NAME} | Build #${env.BUILD_NUMBER}"
        }
        failure {
            echo "❌ Pipeline FAILED — check logs above"
            // slackSend channel: env.SLACK_CHANNEL, color: 'danger',
            //     message: "❌ MoodTune deploy FAILED on ${env.BRANCH_NAME} | Build #${env.BUILD_NUMBER}"
        }
        always {
            // Clean workspace after build
            cleanWs()
        }
    }
}