import axios from "axios";

const instance = axios.create({baseURL: "https://social-network.samuraijs.com/api/1.1/", withCredentials: true})

type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
        item: TodoListType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}

export type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}




export const todolistApi = {
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    updateTotoList(todoId: string, title: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todoId}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title})
    },
    deleteTotoList(todoId: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todoId}`)
    }
}