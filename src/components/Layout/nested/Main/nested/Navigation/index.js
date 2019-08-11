import Navigation from './Navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../../../store'

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout: actions.auth.logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
