import React, { Component } from 'react'
import { api } from '../../services'
import Event from './nested'
import './Events.scss'

class Events extends Component {
  state = {
    events: []
  }

  componentDidMount = () => {
    api.events.getEvents()
      .then((events) => {
        this.setState({
          events: events.data
        })
      })
  }

  render () {
    const { events } = this.state

    return (
      <div>
        {events.map(event => (
          <Event key={event.messageId} event={event} />
        ))}
      </div>
    )
  }
}

export default Events
