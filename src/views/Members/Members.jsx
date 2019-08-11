import React, { Component } from 'react'
import { api } from '../../services'
import Member from './nested'
import './Members.scss'

class Members extends Component {
  state = {
    members: []
  }

  componentDidMount = () => {
    api.members.getMembers()
      .then(members => {
        this.setState({
          members: members.data
        })
      })
  }

  render () {
    const { members } = this.state

    return (
      <div className='members'>
        {members.map(member => (
          <Member key={member.id} member={member} />
        ))}
      </div>
    )
  }
}

export default Members
