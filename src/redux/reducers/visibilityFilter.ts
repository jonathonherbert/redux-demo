import { SHOW_ALL } from "../../constants/TodoFilters";
import { Actions, setVisibilityFilter } from "../actions";

const visibilityFilter = (state = SHOW_ALL, action: Actions) => {
  if (setVisibilityFilter.match(action)) {
    return action.payload;
  }
  return state;
};

export default visibilityFilter;
