import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedax";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/todolist-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleStatusActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleStatusActionType
    | addTodolistACType | removeTodolistACType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {
                id: v1(),
                todoListId: action.todolistId,
                title: action.title,
                status: TaskStatuses.New,
                addedDate: "",
                startDate: "",
                deadline: "",
                description: "",
                priority: TodoTaskPriorities.Low,
                order: 0
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState

            const {[action.id]: [], ...rest} = state
            return rest
        }
        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}