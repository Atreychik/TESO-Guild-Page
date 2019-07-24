// server
const express = require('express')
const http = require('http')
const path = require('path')

// requests
const axios = require('axios')
const bodyParser = require('body-parser')
const formUrlEncoded = require('form-urlencoded').default

// env variables
const dotenv = require('dotenv')
dotenv.config()

// other variables
const redirectUri = 'http://localhost:3000/login'
const scope = 'identify guilds.join'

// server config
let app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || '8080'
app.set('port', port)

// get Discord auth token for users
app.post('/token/get', (request, response) => {
  axios({
    method: 'POST',
    url: 'https://discordapp.com/api/v6/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formUrlEncoded({
      client_id: process.env.BOT_ID,
      client_secret: process.env.BOT_SECRET,
      grant_type: 'authorization_code',
      code: request.body.code,
      redirect_uri: redirectUri,
      scope: scope
    })
  })
    .then(res => response.send(JSON.stringify(res.data)))
    .catch(err => response.send(JSON.stringify(err.response.data)))
})

// refresh Discord auth token
app.post('/token/refresh', (request, response) => {
  axios({
    method: 'POST',
    url: 'https://discordapp.com/api/v6/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formUrlEncoded({
      client_id: process.env.BOT_ID,
      client_secret: process.env.BOT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: request.body.token,
      redirect_uri: redirectUri,
      scope: scope
    })
  })
    .then(res => response.send(JSON.stringify(res.data)))
    .catch(err => response.send(JSON.stringify(err.response.data)))
})

// start server
const server = http.createServer(app)
server.listen(port, () => console.log(`Running on localhost:${port}`))
