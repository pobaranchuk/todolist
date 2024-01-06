import { todolistActions } from "./todolists-reducer"
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../api/todolists-api"
import { Dispatch } from "redux"
import { AppRootStateType } from "../../app/store"
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "../../app/app-reducer"

const slice = createSlice({
  name: "task",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>,
    ) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      )
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string
        model: UpdateDomainTaskModelType
        todolistId: string
      }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index != -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (
      state,
      action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>,
    ) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
  },
})

export const taskReducer = slice.reducer
export const taskActions = slice.actions

// thunks
export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(appActions.setStatus({ status: "loading" }))
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
      dispatch(taskActions.setTasks({ tasks, todolistId }))
      dispatch(appActions.setStatus({ status: "succeeded" }))
    })
  }
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch<any>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = taskActions.removeTask({ taskId, todolistId })
      dispatch(action)
    })
  }
export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(appActions.setStatus({ status: "loading" }))
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          const action = taskActions.addTask({ task })
          dispatch(action)
          dispatch(appActions.setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTaskTC =
  (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string,
  ) =>
  (dispatch: any, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in    tate");
      console.warn("task not found in the state")
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = taskActions.updateTask({
            taskId,
            model: apiModel,
            todolistId,
          })
          dispatch(action)
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
