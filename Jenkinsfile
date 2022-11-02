
pipeline {
    agent none
    environment { DEPLOY_VERSION = '0.1.6' }
    tools { nodejs 'node-12' }
    stages {
        stage('Build dist') {
            agent any
            steps {
                sh 'node -v'
                sh 'ls -l'
                sh 'echo $NODE_OPTIONS'
                withNPM(npmrcConfig: 'artefacto-npmrc') { sh 'npm install --legacy-peer-deps' }
                sh 'ls -l'
                // sh 'npm run build'
                // stash includes: 'target/*.jar', name: 'app' 
            }
        }

    }
}

