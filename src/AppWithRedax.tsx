import React, {useCallback, useReducer} from 'react';
import './App.css';
import './ToDoList';
import {TasksStateType, ToDoList} from "./ToDoList";
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

function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    const addTask = useCallback((todolistID: string, title: string) => {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [dispatch])

    const removeTask = (todolistId: string, taskId: string) => {
        let action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
        let action = changeTaskTitleAC(taskID, title, todolistID)
        dispatch(action)
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        let action = changeTaskStatusAC(taskID, isDone, todolistID)
        dispatch(action)
    }

    const changeToDoListFilter = (todoListID: string, filter: FilterValuesType) => {
        let action = changeToDoListFilterAC(filter, todoListID)
        dispatch(action)
    }

    const addToDoList = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const removeToDoList = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
        delete tasks[todolistID]
    }

    const updateToDoListTitle = (todolistID: string, newTitle: string) => {
        let action = changeTodolistTitleAC(todolistID, newTitle)
        dispatch(action)
    }



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
                                key={index}
                                todoListID={ul.id}
                                title={ul.title}
                                tasks={tasks}
                                addTask={addTask}
                                updateTask={updateTaskTitle}
                                removeTask={removeTask}
                                changeFilter={changeToDoListFilter}
                                changeStatus={changeTaskStatus}
                                filter={ul.filter}
                                removeTodoList={removeToDoList}
                                updateToDoList={updateToDoListTitle}
                            />
                        </Paper>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;