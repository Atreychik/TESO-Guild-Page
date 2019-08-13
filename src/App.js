import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import { actions } from './store'
import { Layout } from './components'
import history from './history'
import {
  Dashboard,
  Events,
  Members
} from './views'
import './styles/App.scss'

class App extends Component {
  componentDidMount = () => {
    const { checkAuthorization, login, getUser } = this.props
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const token = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    const id = localStorage.getItem('id')

    if (code) {
      login(code)
        .then(() => {
          getUser(localStorage.getItem('id'))
          history.push('/')
        })
    } else {
      checkAuthorization(token, refreshToken, id)
    }
  }

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/events' component={Events} />
          <Route path='/members' component={Members} />
        </Switch>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  checkAuthorization: actions.auth.checkAuthorization,
  login: actions.auth.login,
  getUser: actions.auth.getUser
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App)
