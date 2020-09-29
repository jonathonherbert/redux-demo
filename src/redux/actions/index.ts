import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { fetchTodo } from "../../services/todo";
import { actions } from "../reducers/todos";
import { AppDispatch } from "../store";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" as const;

export const fetchTodos = createAsyncThunk('fetchTodos', fetchTodo)

export const setVisibilityFilter = createAction<
  string,
  "SET_VISIBILITY_FILTER"
>("SET_VISIBILITY_FILTER");

export type Actions<K extends keyof typeof actions = keyof typeof actions> =
  | ReturnType<typeof actions[K]>
  | ReturnType<typeof setVisibilityFilter>;
