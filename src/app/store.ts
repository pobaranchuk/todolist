import { todolistReducer } from "../features/TodolistsList/todolists-reducer"
import { combineReducers } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app-reducer"
import { authReducer } from "../features/Login/auth-reducer"
import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { taskReducer } from "../features/TodolistsList/tasks-reducer"

const rootReducer = combineReducers({
  tasks: taskReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})

// ❗старая запись, с новыми версиями не работает
//  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof store.getState>

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  UnknownAction
>

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  UnknownAction
>
