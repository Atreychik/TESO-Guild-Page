// server
const express = require('express')
const http = require('http')
const path = require('path')

// requests
const cors = require('cors')
const axios = require('axios')
const discord = axios.create({ baseURL: 'https://discordapp.com/api/v6' })
const bodyParser = require('body-parser')
const formUrlEncoded = require('form-urlencoded').default

// env variables
const dotenv = require('dotenv')
dotenv.config()

// other variables
const redirectUri = 'http://localhost:3000/login'
const scope = 'identify guilds.join'
const guildId = '453842402235514881'
const channelId = '566371215665659913'

// init Firebase DB connection
const firebaseAdmin = require('firebase-admin')
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: 'service_account',
    project_id: 'dark-machines',
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: 'firebase-adminsdk-glovo@dark-machines.iam.gserviceaccount.com',
    client_id: process.env.CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: process.env.AUTH_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  }),
  databaseURL: 'https://dark-machines.firebaseio.com'
})
const fb = firebaseAdmin.firestore()

// server config
let app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// get Discord auth token for users
app.post('/token/get', (request, response) => {
  discord({
    method: 'POST',
    url: `/oauth2/token`,
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
    .then(res => {
      discord({
        method: 'GET',
        url: `/users/@me`,
        headers: {
          'Authorization': `${res.data.token_type} ${res.data.access_token}`
        }
      })
        .then(res => {
          fb.collection('members').doc(res.data.id).get()
            .then(member => {
              if (!member.exists) {
                fb.collection('members').doc(res.data.id).set({
                  username: res.data.username,
                  id: res.data.id,
                  avatar: res.data.avatar ? `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}?size=256` : null,
                  email: res.data.email
                })
              }
            })
        })
        .catch(err => console.log(err))
      response.json(res.data)
    })
    .catch(err => response.json(err.response.data))
})

// refresh Discord auth token
app.post('/token/refresh', (request, response) => {
  discord({
    method: 'POST',
    url: `/oauth2/token`,
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
    .then(res => response.json(res.data))
    .catch(err => response.json(err.response.data))
})

app.get('/events', async (request, response) => {
  let eventsList = []
  await fb.collection('events').get()
    .then((events) => {
      events.forEach((event) => {
        let eventObj = Object.assign({
          authorId: event.data().authorId,
          eventDate: event.data().eventDate,
          message: event.data().message,
          messageId: event.data().messageId
        })

        eventsList.push(eventObj)
      })
    })

  response.json(eventsList)
})

app.get('/members', async (request, response) => {
  let membersList = []
  await fb.collection('members').get()
    .then((members) => {
      members.forEach((member) => {
        let memberObj = Object.assign({
          id: member.data().id,
          username: member.data().username,
          email: member.data().email,
          avatar: member.data().avatar
        })

        membersList.push(memberObj)
      })
    })

  response.json(membersList)
})

app.get('/guild/roles', (request, response) => {
  discord({
    method: 'GET',
    url: `/guilds/${guildId}/roles`,
    headers: {
      'Authorization': `Bot ${process.env.BOT_KEY}`
    }
  })
    .then(res => response.json(res.data))
    .catch(err => response.json(err.response.data))
})

app.put('/guild/members', (request, response) => {
  discord({
    method: 'PUT',
    url: `/guilds/${guildId}/members/${request.body.userId}`,
    headers: {
      'Authorization': `Bot ${process.env.BOT_KEY}`
    },
    data: {
      access_token: `Bearer ${request.body.token}`
    }
  })
    .then(res => response.json(res.data))
    .catch(err => response.json(err.response.data))
})

app.put('/guild/members/roles', (request, response) => {
  discord({
    method: 'PUT',
    url: `/guilds/${guildId}/members/${request.body.userId}/roles/${request.body.roleId}`,
    headers: {
      'Authorization': `Bot ${process.env.BOT_KEY}`
    }
  })
    .then(res => response.json(res.data))
    .catch(err => response.json(err.response.data))
})

app.post('/guild/messages', (request, response) => {
  discord({
    method: 'POST',
    url: `/channels/${channelId}/messages`,
    headers: {
      'Authorization': `Bot ${process.env.BOT_KEY}`
    },
    data: {
      content: request.body.content
    }
  })
    .then(res => response.json(res.data))
    .catch(err => response.json(err.response.data))
})

app.put('/guild/messages/reactions', (request, response) => {
  discord({
    method: 'PUT',
    url: `/channels/${channelId}/messages/${request.body.messageId}/reactions/${encodeURIComponent(request.body.emoji)}/@me`,
    headers: {
      'Authorization': `${request.body.tokenType || 'Bot'} ${request.body.token || process.env.BOT_KEY}`
    }
  })
    .then(res => response.json(res))
    .catch(err => response.json(err))
})

app.delete('/guild/messages/reactions', (request, response) => {
  discord({
    method: 'DELETE',
    url: `/channels/${channelId}/messages/${request.body.messageId}/reactions/${encodeURIComponent(request.body.emoji)}/@me`,
    headers: {
      'Authorization': `${request.body.tokenType || 'Bot'} ${request.body.token || process.env.BOT_KEY}`
    }
  })
    .then(res => response.json(res))
    .catch(err => response.json(err))
})

// start server
const port = process.env.PORT || '8080'
const server = http.createServer(app)
app.set('port', port)
server.listen(port, () => console.log(`Running on localhost:${port}`))
