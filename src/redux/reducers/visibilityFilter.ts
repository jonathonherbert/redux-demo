import { SHOW_ALL } from "../../constants/TodoFilters";
import { Actions, setVisibilityFilter } from "../actions";

const visibilityFilter = (state = SHOW_ALL, action: Actions) => {
  if (action.type === "SET_VISIBILITY_FILTER") {
    return action.payload;
  }
  return state;
};

export default visibilityFilter;
