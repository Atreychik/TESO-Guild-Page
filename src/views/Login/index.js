import Login from './Login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../store'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: actions.auth.login
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Login)
