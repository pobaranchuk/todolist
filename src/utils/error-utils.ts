import { ResponseType } from "../api/todolists-api"
import { Dispatch } from "redux"
import { appActions } from "../app/app-reducer"

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<any>,
) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setError({ error: "Some error occurred" }))
  }
  dispatch(appActions.setStatus({ status: "failed" }))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<any>,
) => {
  dispatch(
    appActions.setError({
      error: error.message ? error.message : "Some error occurred",
    }),
  )
  dispatch(appActions.setStatus({ status: "failed" }))
}
