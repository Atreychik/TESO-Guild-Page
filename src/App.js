import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Layout } from './components'
import {
  Dashboard,
  Login
} from './views'
import './styles/App.scss'

class App extends Component {
  render () {
    const history = createBrowserHistory()

    return (
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

// WTF!?

export default App
