import { connect } from 'react-redux'
import Header from '../components/Header'
import { actions } from '../redux/reducers/todos'

export default connect(null, { addTodo: actions.addTodoSuccess })(Header)
