import { todolistsAPI, TodolistType } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { appActions, RequestStatusType } from "../../app/app-reducer"
import { handleServerNetworkError } from "../../utils/error-utils"
import { AppThunk } from "../../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTasksTC } from "./tasks-reducer"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      // 1 variant
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) => {
      // 1 variant
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index != -1) state[index].entityStatus = action.payload.entityStatus
    },
    setTodolists: (
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>,
    ) => {
      // 1 variant
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    },
    clearTodos: (state, action: PayloadAction) => {
      // state = []
      // return state
      state.splice(0, state.length)
    },
  },
})

export const todolistReducer = slice.reducer
export const todolistActions = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistActions.setTodolists({ todolists: res.data }))
        dispatch(appActions.setStatus({ status: "succeeded" }))
        return res.data
      })
      .then((todos) => {
        todos.forEach((tl) => dispatch(fetchTasksTC(tl.id)))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setStatus({ status: "loading" }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(
      todolistActions.changeTodolistEntityStatus({
        id: todolistId,
        entityStatus: "loading",
      }),
    )
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistActions.removeTodolist({ id: todolistId }))
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setStatus({ status: "succeeded" }))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setStatus({ status: "succeeded" }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistActions.changeTodolistTitle({ id, title }))
    })
  }
}
