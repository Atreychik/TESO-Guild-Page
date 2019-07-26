import React, { Component } from 'react'
import './Login.scss'

class Login extends Component {
  componentDidMount = () => {
    const { login } = this.props
    const params = new URLSearchParams(this.props.location.search)
    const code = params.get('code')

    login(code)
  }

  render () {
    return (
      <div>Login</div>
    )
  }
}

export default Login
