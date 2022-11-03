
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
                withNPM(npmrcConfig: 'artefacto-npmrc') { 
                    sh 'npm install --legacy-peer-deps' 
                    sh 'npm run build'
                    }

                sh 'ls -l'
                stash includes: 'dist/**/*', name: 'app' 
            }
        }
        stage('Build Docker, Save in ECR and Publish K8s') {
            agent { 
                label 'dind-agent'
            }
            steps {
                unstash 'app' 
                script{
                    app = docker.build("devops_test",  "--build-arg FOLDER_DIST=./dist -f Dockerfile.jenkins .")
                    docker.withRegistry('https://648505502080.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:aws-credentials') {
                    app.push("${env.DEPLOY_VERSION}")
                    app.push("latest")
                    }
                sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                sh 'chmod u+x ./kubectl'  
                sh "./kubectl get pods -n ${env.ENTORNO}"
                }
            }
            
        }

    }
}

