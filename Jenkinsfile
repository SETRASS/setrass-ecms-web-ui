
pipeline {
    agent none
    environment { DEPLOY_VERSION = '2.0.23' }
    tools { nodejs 'node-12' }
    stages {
        stage('Build dist') {
            agent any
            steps {
                sh 'node -v'
                sh 'echo $NODE_OPTIONS'
                withNPM(npmrcConfig: 'artefacto-npmrc') {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'
                    }
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
                    app = docker.build("setrass-ecms-web-ui",  "--build-arg FOLDER_DIST=./dist -f Dockerfile.jenkins .")
                    docker.withRegistry('https://648505502080.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:aws-credentials') {
                    app.push("${env.DEPLOY_VERSION}")
                    app.push("latest")
                    }
                sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                sh 'chmod u+x ./kubectl'

                if (env.ENTORNO == 'development') {
                    withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
                        script {
                            sh ('aws eks update-kubeconfig --name setrass-ecms-aws-eks-cluster --region us-east-1')
                            sh "./kubectl apply -f k8s.yml -n development"
                        }
                    }
                } else {
                    configFileProvider(
                        [configFile(fileId: '4a6a1fe9-3181-4d06-8dd0-01c74acce756', targetLocation: 'prod.yml', variable: 'CLUSTER')])
                        {
                            sh "./kubectl --kubeconfig $CLUSTER apply -f k8s.yml -n ${env.ENTORNO}"
                        }
                    }
                }
            }

        }

    }
}

