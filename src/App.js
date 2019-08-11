import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import { actions } from './store'
import { Layout } from './components'
import {
  Dashboard,
  Login,
  Events,
  Members
} from './views'
import './styles/App.scss'

class App extends Component {
  componentDidMount = () => {
    const { checkAuthorization } = this.props

    checkAuthorization()
  }

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/events' component={Events} />
          <Route path='/members' component={Members} />
          <Route path='/login' component={Login} />
        </Switch>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  checkAuthorization: actions.auth.checkAuthorization
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App)
