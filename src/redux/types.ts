import { ThunkAction } from "redux-thunk";
import { Actions } from "./actions";

import rootReducer from "./reducers";
import { createStore } from "./store";

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Actions
>;
