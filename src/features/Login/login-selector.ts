import { AppRootStateType } from "../../app/store"

export const loginSelector = (state: AppRootStateType) => state.auth.isLoggedIn
