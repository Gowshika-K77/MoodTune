pipeline {
    agent any
 
    environment {
        DEPLOY_DIR = '/var/www/html/MoodTune'   // Linux
        // DEPLOY_DIR = 'C:\\inetpub\\wwwroot\\MoodTune'  // Windows
    }
 
    stages {
 
        stage('Checkout') {
            steps {
                echo '=== Pulling latest code from GitHub ==='
                checkout scm
            }
        }
 
        stage('Validate Files') {
            steps {
                script {
                    def required = ['index.html', 'style.css', 'script.js']
                    required.each { f ->
                        if (fileExists(f)) {
                            echo "OK: ${f} found"
                        } else {
                            error "MISSING: ${f} not found -- stopping build"
                        }
                    }
                    echo 'All required files validated!'
                }
            }
        }
 
        stage('Build Info') {
            steps {
                echo "Build Number : ${env.BUILD_NUMBER}"
                echo "Branch       : ${env.GIT_BRANCH}"
                echo "Commit       : ${env.GIT_COMMIT}"
                echo "Build URL    : ${env.BUILD_URL}"
            }
        }
 
        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            mkdir -p /var/www/html/MoodTune
                            cp -r index.html style.css script.js /var/www/html/MoodTune/
                            echo Deployed to /var/www/html/MoodTune
                        '''
                    } else {
                        bat '''
                            if not exist "C:\\inetpub\\wwwroot\\MoodTune" mkdir "C:\\inetpub\\wwwroot\\MoodTune"
                            xcopy /E /Y index.html style.css script.js C:\\inetpub\\wwwroot\\MoodTune\\
                            echo Deployed to C:\\inetpub\\wwwroot\\MoodTune
                        '''
                    }
                }
            }
        }
 
    }
 
    post {
        success {
            echo '=== BUILD PASSED -- MoodTune is live! ==='
        }
        failure {
            echo '=== BUILD FAILED -- check Console Output ==='
        }
        always {
            echo "Pipeline finished for build #${env.BUILD_NUMBER}"
        }
    }
}
