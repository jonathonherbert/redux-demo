import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "../redux/actions";
import TodoList from "../components/TodoList";
import { getIsLoading, getVisibleTodos } from "../redux/selectors";

const mapStateToProps = (state) => ({
  filteredTodos: getVisibleTodos(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(todoActions, dispatch),
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
