import { connect } from 'react-redux'
import Header from '../components/Header'
import * as actions from '../redux/actions'

export default connect(null, { addTodo: actions.addTodoSuccess })(Header)
