const createGithubServer = require('./')
const GitHubApi = require('github')
const path = require('path')
const http = require('http')

function getGithubObject() {
    const token = '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'

    const github = new GitHubApi({
        // required
        version: '3.0.0',
        // optional
        // debug: true,
        timeout: 5000,
        headers: {
            'user-agent': 'private-github-rox-gdi-test', // GitHub is happy with a unique user agent
        }
    })

    github.authenticate({
        type: 'oauth',
        token: token
    })

    return github
}

function getRepoOptions() {
    const owner = 'euedeep'
    const repo = 'https://github.com/euedeep/rox-gdi-test.git'

    return {
        owner,
        repo,
        ref: 'heads/master'
    }
}

const server = http.createServer()


const options = {
    // path: path.join(os.tmpdir(), Math.random().toString().slice(2)),
    // db: levelmem('lol'),
    transportOptions: {
        host: 'mail.fake.whatever',
        port: 465,
        secureConnection: true,
        secure: true,
        // debug: true,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        },
        auth: {
            user: 'seblaxlada@gmail.com',
            pass: 'test'
        }
    },
    defaultMailOptions: {
        from: 'seblaxlada@gmail.com',
        subject: 'Log in to private-github-rox-gdi-test test site'
    },
    smtpServer: 'mail.fake.whatever',
    getEmailText: function (token) {
        const site = 'https://polished-rice-21d5.roxdrive.workers.dev'
        const url = path.join(site, /*'/public/auth'*/'/') + '?token=' + token
        const emailHtml = '<p>Somebody is trying to log in as you!  If it is you, you should click on ' + 'this handy link'.link(url) + '</p>'
            + '<p>If it isn\'t you, you should definitely NOT click on that link.</p>'
        return emailHtml
    },
    domain: 'polished-rice-21d5.roxdrive.workers.dev',
    refresh: 60 * 60 * 1000,
    server: server
}


createGithubServer(getGithubObject(), getRepoOptions(), options).listen(443)