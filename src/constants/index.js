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
  // app: 'http://localhost:8080',
  app: 'https://teso-guild-page.herokuapp.com/login',
  discord: 'https://discordapp.com/api/v6'
}
