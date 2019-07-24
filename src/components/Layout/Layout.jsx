import React, { Component } from 'react'
import { Loader } from '../../components'
import {
  Header,
  Main
} from './nested'

class Layout extends Component {
  state = {
    isLoading: true,
    showMain: true,
    showHeader: false
  }

  componentDidMount = () => {
    window.addEventListener('load', () => {
      this.setState({
        isLoading: false,
        showMain: false,
        showHeader: true
      })
    })
  }

  showMain = () => {
    this.setState(prev => {
      return {
        showMain: !prev.showMain,
        showHeader: !prev.showHeader
      }
    })
  }

  render () {
    const { children } = this.props
    const { isLoading, showMain, showHeader } = this.state

    return (
    <>
      <Loader isLoading={isLoading} />
      <Header show={showHeader} onClick={this.showMain} />
      <Main show={showMain} children={children} />
    </>)
  }
}
export default Layout
