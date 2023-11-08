import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

type todolistsReducerType = removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeFilterACType

export const todolistsReducer = (state: TodoListType[], action: todolistsReducerType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodoListType = {id: action.todolistId, title: action.title, filter: 'All'};
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default:
            return state
    }
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

export const changeFilterAC = (filter: FilterValuesType, id: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}