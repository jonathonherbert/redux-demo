import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { actions as todoActions } from "../redux/reducers/todos";
import { bindActionCreators } from "redux";
import MainSection from "../components/MainSection";
import { getCompletedTodoCount, getIsLoading } from "../redux/selectors";

const mapStateToProps = (state) => ({
  todosCount: state.todos.todos.length,
  completedCount: getCompletedTodoCount(state),
  isLoading: console.log(state) || getIsLoading(state),
  error: state.todos.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...todoActions, ...actions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
