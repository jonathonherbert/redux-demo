import { createSelector } from 'reselect'
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../../constants/TodoFilters'
import { RootState } from '../types'

const getVisibilityFilter = (state: RootState) => state.visibilityFilter
const getTodos = (state: RootState) => state.todos
export const getIsLoading = (state: RootState) => state.todos.isLoading

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos.todos
      case SHOW_COMPLETED:
        return todos.todos.filter(t => t.completed)
      case SHOW_ACTIVE:
        return todos.todos.filter(t => !t.completed)
    }
  }
)

export const getCompletedTodoCount = createSelector([getTodos], todos =>
  todos.todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
)
