import React, {useCallback} from 'react';
import './App.css';
import './ToDoList';
import {ToDoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const addTask = useCallback((todolistID: string, title: string) => {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        let action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    },[dispatch])

    const updateTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        let action = changeTaskTitleAC(taskID, title, todolistID)
        dispatch(action)
    },[dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        let action = changeTaskStatusAC(taskID, status, todolistID)
        dispatch(action)
    },[dispatch])

    const changeToDoListFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        let action = changeToDoListFilterAC(filter, todoListID)
        dispatch(action)
    },[dispatch])

    const addToDoList = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const removeToDoList = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    },[dispatch])

    const updateToDoListTitle = useCallback((todolistID: string, newTitle: string) => {
        let action = changeTodolistTitleAC(todolistID, newTitle)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: "20px"}}>
                    <AddItemForm onClick={addToDoList}/>
                </Grid>
                <Grid container>
                    {todoLists.map((ul, index) => {
                        return <Paper elevation={3} style={{padding: '20px', margin: "10px"}} key={index}>
                            <ToDoList
                                id={ul.id}
                                todoListID={ul.id}
                                title={ul.title}
                                tasks={tasks[ul.id]}
                                addTask={addTask}
                                updateTaskTitle={updateTaskTitle}
                                removeTask={removeTask}
                                changeToDoListFilter={changeToDoListFilter}
                                changeTaskStatus={changeTaskStatus}
                                filter={ul.filter}
                                removeTodoList={removeToDoList}
                                updateToDoListTitle={updateToDoListTitle}
                            />
                        </Paper>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;