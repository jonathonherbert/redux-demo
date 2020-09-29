import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit'
import { create } from 'domain'
import {
  Actions,
  ADD_TODO_START,
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  fetchTodos
} from '../actions'

export interface ITodo {
  text: string
  completed: boolean
  id: number
}

export type ITodoState = {
  todos: ITodo[]
  isLoading: boolean
  error: undefined | string
}

const todoAdapter = createEntityAdapter<ITodo>({
  selectId: todo => todo.id
})

const initialState: ITodoState = {
  todos: [],
  isLoading: false,
  error: undefined
}

export default function todos(state = initialState, action: Actions) {
  switch (action.type) {
    case ADD_TODO_START:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        todos: [
          ...state.todos,
          {
            id:
              state.todos.reduce(
                (maxId, todo) => Math.max(todo.id, maxId),
                -1
              ) + 1,
            completed: false,
            text: action.payload.text
          }
        ]
      }

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      }

    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.todos.every(todo => todo.completed)
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllMarked
        }))
      }

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.completed === false)
      }

    default:
      return state
  }
}



