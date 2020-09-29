import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { fetchTodo } from "../../services/todo";
import { actions } from "../reducers/todos";
import { AppDispatch } from "../store";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" as const;

export const fetchTodos = (throwError: false) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.addTodoStart());
  try {
    const todoMessage = await fetchTodo(throwError);
    dispatch(actions.addTodoSuccess(todoMessage));
  } catch (e) {
    dispatch(actions.addTodoError(e.message));
  }
};

export const setVisibilityFilter = createAction<
  string,
  "SET_VISIBILITY_FILTER"
>("SET_VISIBILITY_FILTER");

export type Actions<K extends keyof typeof actions = keyof typeof actions> =
  | ReturnType<typeof actions[K]>
  | ReturnType<typeof setVisibilityFilter>;
