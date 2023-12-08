import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const payload = {title: 'REACT'}

        todolistApi.createTodoList(payload.title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '2f387be9-e842-4831-a0d2-d0f3e0c72405'

        todolistApi.deleteTotoList(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '16aaf028-5207-4c14-aff3-0a2924466201'
        const payload = {title: 'Yoy yoyoy yoyoy'}

        todolistApi.updateTotoList(todoId, payload.title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = "ee369eec-c3f0-4d10-a507-119423950d10"
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "ee369eec-c3f0-4d10-a507-119423950d10"
        const taskId = "4cff7a59-15fd-45ac-87a4-d952828dc65d"
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "ee369eec-c3f0-4d10-a507-119423950d10"
        const title = "I want buy milk"
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "ee369eec-c3f0-4d10-a507-119423950d10"
        const title = "I want buy AAAAAA"
        const taskId = "f4ad16fe-a468-4a16-85a9-72f1fb25f94c"
        todolistApi.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}