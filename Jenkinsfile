
pipeline {
    agent none
    environment { DEPLOY_VERSION = '0.1.6' }
    tools { nodejs 'node-12' }
    stages {
        stage('Build dist') {
            agent any
            steps {
                //sh 'echo -e "@emanuel-sosa-setrass:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=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" > ~/.npmrc'
                // sh 'cat ~/.npmrc'
                sh 'node -v'
                // sh 'npm cache clean --force'
                //sh 'npm list'
                sh 'ls -l'
                sh 'export NODE_OPTIONS="--max-old-space-size=8192"'
                sh 'echo $NODE_OPTIONS'
                withNPM(npmrcConfig: 'artefacto-npmrc') { sh 'npm install --save --legacy-peer-deps' }
                // sh 'npm run build'
                // stash includes: 'target/*.jar', name: 'app' 
            }
        }

    }
}

