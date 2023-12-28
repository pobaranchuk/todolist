import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppInitialized, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authApi, LoginParams} from "../../api/auth-api";
import {ResultCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIN}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (isLoggedIN: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIN} as const)

// thunks
export const loginTC = (data: LoginParams) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
            return res.data
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch)
    }
}

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res= await authApi.me()
        if (res.data.resultCode === ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC(true));
        } else {
            //handleServerAppError(res.data, dispatch)
        }
    }catch (e){
        handleServerNetworkError(e as Error, dispatch)
    }finally {
        dispatch(setAppInitialized(true))
    }
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType