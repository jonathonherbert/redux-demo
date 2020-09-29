import { fetchTodo } from '../../services/todo'

export const ADD_TODO_START = 'ADD_TODO_START' as const
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR' as const
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS' as const
export const DELETE_TODO = 'DELETE_TODO' as const
export const EDIT_TODO = 'EDIT_TODO' as const
export const COMPLETE_TODO = 'COMPLETE_TODO' as const
export const COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS' as const
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED' as const
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER' as const

export const fetchTodos = createAsyncThunk('todos/fetchTodos', (throwError: false) => fetchTodo(throwError))

export const addTodoStart = (text: string) => ({
  type: ADD_TODO_START,
  payload: { text }
})

export const addTodoError = (text: string) => ({
  type: ADD_TODO_ERROR,
  payload: { text }
})
export const addTodoSuccess = (text: string) => ({
  type: ADD_TODO_SUCCESS,
  payload: { text }
})

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: { id }
})

export const editTodo = (id: number, text: string) => ({
  type: EDIT_TODO,
  payload: { id, text }
})

export const completeTodo = (id: number) => ({
  type: COMPLETE_TODO,
  payload: { id }
})

export const completeAllTodos = () => ({ type: COMPLETE_ALL_TODOS })

export const clearCompleted = () => ({ type: CLEAR_COMPLETED })

export const setVisibilityFilter = (filter: any) => ({
  type: SET_VISIBILITY_FILTER,
  payload: { filter }
})

export type Actions =
  | ReturnType<typeof addTodoStart>
  | ReturnType<typeof addTodoError>
  | ReturnType<typeof addTodoSuccess>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof editTodo>
  | ReturnType<typeof completeTodo>
  | ReturnType<typeof completeTodo>
  | ReturnType<typeof completeAllTodos>
  | ReturnType<typeof clearCompleted>
  | ReturnType<typeof setVisibilityFilter>
