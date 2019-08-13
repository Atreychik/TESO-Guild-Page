export const navigation = [
  {
    label: 'Main',
    path: '/',
    exact: true
  },
  {
    label: 'Events',
    path: '/events',
    exact: false
  },
  {
    label: 'Members',
    path: '/members',
    exact: false
  },
  {
    label: 'Abouts Us',
    path: '/about',
    exact: false
  },
  {
    label: 'Contacts',
    path: '/contacts',
    exact: false
  }
]

export const baseURL = {
  app: 'https://teso-guild-page.herokuapp.com',
  // app: 'http://localhost:8080',
  discord: 'https://discordapp.com/api/v6',
  // authURI: 'https://discordapp.com/api/oauth2/authorize?client_id=564098556399452160&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20guilds.join'
  authURI: 'https://discordapp.com/api/oauth2/authorize?client_id=564098556399452160&redirect_uri=https%3A%2F%2Fteso-guild-page.herokuapp.com&response_type=code&scope=identify%20email%20guilds.join'
}
