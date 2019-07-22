import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Layout } from './components'
import { Dashboard } from './views'
import './styles/App.scss'

class App extends Component {
  render () {
    const history = createBrowserHistory()

    return (
      <Layout>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Dashboard} />
          </Switch>
        </Router>
      </Layout>
    )
  }
}

export default App
