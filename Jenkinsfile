def sshCmd(cmd) {
    def ip = '115.238.186.108'
    def user = 'root'
    sh "ssh -o StrictHostKeyChecking=no -l ${user} ${ip} '${cmd}'"
}
def ip = '115.238.186.108'
def username = 'root'
pipeline {
    agent any

    tools { nodejs 'nodejs' }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('build') {
            steps {
                sh 'npm config set registry https://registry.npmmirror.com'
                sh 'pnpm i --frozen-lockfile'
                sh 'pnpm run clean'
                sh 'pnpm run build'
            }
        }

        stage('deloy') {
            steps {
                sshagent(credentials: ['flysky']) {
                    sh "ssh ${username}@${ip} 'sudo rm -rf /opt/1panel/apps/openresty/openresty/www/sites/ycym.zzybgp.com/index/*'"
                    sh "scp -r dist/* ${username}@${ip}:/opt/1panel/apps/openresty/openresty/www/sites/ycym.zzybgp.com/index"
                }
            }
        }
    }
}
