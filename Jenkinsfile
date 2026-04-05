pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo '=== Pulling code from GitHub ==='
                checkout scm
            }
        }
        stage('Validate Files') {
            steps {
                script {
                    ['index.html', 'style.css', 'script.js'].each { f ->
                        if (fileExists(f)) { echo "OK: ${f}" }
                        else               { error "MISSING: ${f}" }
                    }
                }
            }
        }
        stage('Build Info') {
            steps {
                echo "Build : ${env.BUILD_NUMBER}"
                echo "Branch: ${env.GIT_BRANCH}"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Ready to deploy — uncomment one line below:'
                // Windows: bat 'xcopy /E /Y . C:\\inetpub\\wwwroot\\MoodTune\\'
                // Linux:   sh  'cp -r . /var/www/html/MoodTune/'
            }
        }
    }
    post {
        success { echo 'BUILD PASSED!' }
        failure { echo 'BUILD FAILED — check logs' }
    }
}