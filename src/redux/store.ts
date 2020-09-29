import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

export const createStore = () => configureStore({ reducer })

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
