
pipeline {
    agent none
    environment { DEPLOY_VERSION = '0.1.6' }
    tools { nodejs 'node-12' }
    stages {
        stage('Build dist') {
            agent any
            steps {
                sh 'echo -e "@emanuel-sosa-setrass:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=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" > ~/.npmrc'
                sh 'cat ~/.npmrc'
                sh 'node -v'
                sh 'npm list'
                sh 'npm install'
                sh 'npm run build'
                sh 'ls -l'
                // stash includes: 'target/*.jar', name: 'app' 
            }
        }

    }
}

