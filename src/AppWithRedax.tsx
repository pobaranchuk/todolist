import React, {useCallback, useReducer} from 'react';
import './App.css';
import './ToDoList';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
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

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        let action = changeTaskStatusAC(taskID, isDone, todolistID)
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