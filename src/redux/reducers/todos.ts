import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchTodos } from "../actions";

export interface ITodo {
  text: string;
  completed: boolean;
  id: number;
}

export type ITodoState = {
  todos: ITodo[];
  isLoading: boolean;
  error: undefined | string;
};

const initialState: ITodoState = {
  todos: [],
  isLoading: false,
  error: undefined,
};

const toolkitSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodoStart: (state) => {
      state.isLoading = true;
    },
    addTodoError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTodoSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = undefined;
      state.todos.push({
        id:
          state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.payload,
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const [todo] = state.todos.filter(
        (todo) => todo.id === action.payload.id
      );
      todo.text = action.payload.text;
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const [todo] = state.todos.filter((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    completeAllTodos: (state) => {
      const areAllMarked = state.todos.every((todo) => todo.completed);
      state.todos.forEach((todo) => (todo.completed = !areAllMarked));
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  }
});

export default toolkitSlice.reducer;
export const actions = toolkitSlice.actions;
