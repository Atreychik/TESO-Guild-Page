// Request for prevent site asleep
const request = require('request')

// DotENV for using .ENV variables for development
const dotenv = require('dotenv')
dotenv.config()

// Import Discord and Firebase
const Discord = require('discord.js')
const admin = require('firebase-admin')

// Init Discord bot
const bot = new Discord.Client()
bot.login(process.env.BOT_KEY)

// Init Firebase DB connection
admin.initializeApp({
  credential: admin.credential.cert({
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
const db = admin.firestore()

// Sending request for prevent site asleep
const keepAlive = () => {
  request('http://dark-machines.herokuapp.com', (err, res, body) => {
    !err ? console.log('I\'M ALIVE') : console.log('I\'M DEAD')
  })
}

// Notify event's users about starting
const informUsers = (eventId) => {
  let message = ''

  // Get Event message for notify
  db.collection('events').doc(eventId).get()
    .then(event => {
      message = event.data().message
    })

  // Notify each user who described to the event
  db.collection('events').doc(eventId).collection('members').get()
    .then(snapshot => {
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          bot.users.get(doc.id).send(`Hi! Event will start now! \n${message}`)
        })
      }
    })
}

// Add and update message in DB
const updateMessages = (message) => {
  // Get current date & time
  let currentDate = new Date().toISOString()

  // Get event date & time
  const regexp = /(\d{2})\.(\d{2})\.(\d{4})\s(\d{2}):(\d{2})/
  const newStr = message.content.match(regexp)

  if (newStr !== null) {
    const eventDate = new Date(`${newStr[3]}-${newStr[2]}-${newStr[1]} ${newStr[4]}:${newStr[5]} UTC+3`).toISOString()

    // Write event info to Firebase DB
    db.collection('events').doc(message.id).set({
      messageId: message.id,
      authorId: message.author.id,
      message: message.content,
      eventDate: eventDate
    })

    // Set timer for notification
    setTimeout(() => {
      informUsers(message.id)
    }, Date.parse(eventDate) - Date.parse(currentDate))
  } else {
    message.channel.send('You should enter event start time!')
  }
}

// Get data from Firebase DB and check active events
bot.once('ready', () => {
  console.log('READY TO FIGHT!!!')

  setInterval(() => {
    keepAlive()
  }, 1200000)

  let currentDate = new Date().toISOString()

  db.collection('events').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const eventDate = doc.data().eventDate
        if (Date.parse(currentDate) < Date.parse(eventDate)) {
          const timer = Date.parse(eventDate) - Date.parse(currentDate)
          setTimeout(() => informUsers(doc.id), timer)
        }
      })
    })
})

// Adding message to Firebase DB
bot.on('message', message => {
  // ***ADD EVENT START***
  if (!message.author.bot && message.channel.name === 'events') {
    updateMessages(message)
  }
  // ***ADD EVENT END***

  // ***DELETE BOT WARNING START***
  if (message.author.bot && message.content === 'You should enter event start time!') {
    setTimeout(() => {
      message.delete()
    }, 3000)
  }
  // ***DELETE BOT WARNING END***
})

// Update message in Firebase DB
bot.on('messageUpdate', (oldMessage, newMessage) => {
  updateMessages(newMessage)
})

// Listen for messages reaction
bot.on('raw', event => {
  switch (event.t) {
    case 'MESSAGE_REACTION_ADD': {
      db.collection('events').doc(event.d.message_id).collection('members').doc(event.d.user_id)
        .set({
          userId: event.d.user_id
        })
      break
    }
    case 'MESSAGE_REACTION_REMOVE': {
      db.collection('events').doc(event.d.message_id).collection('members').doc(event.d.user_id).delete()
      break
    }
  }
})
