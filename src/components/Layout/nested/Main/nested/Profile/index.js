import { connect } from 'react-redux'
import Profile from './Profile'

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps
)(Profile)
