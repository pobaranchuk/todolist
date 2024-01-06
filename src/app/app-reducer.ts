import { Dispatch } from "redux"
import { authAPI } from "../api/todolists-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authActions } from "../features/Login/auth-reducer"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialied: (
      state,
      action: PayloadAction<{ isInitialied: boolean }>,
    ) => {
      state.isInitialized = action.payload.isInitialied
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }
    dispatch(appActions.setIsInitialied({ isInitialied: true }))
  })
}

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
