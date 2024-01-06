import { AppRootStateType } from "../../app/store"

export const errorSnackbarSelector = (state: AppRootStateType) =>
  state.app.error
