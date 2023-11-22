import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type ToDoListPropsType = {
    todoListID: string
    title: string
    tasks: TasksStateType
    addTask: (todolistID: string, title: string) => void
    updateTask: (todolistID: string, taskID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    updateToDoList: (todolistID: string, newTitle: string) => void
}

export const ToDoList: React.FC<ToDoListPropsType> = ({
                                                          todoListID,
                                                          title,
                                                          tasks,
                                                          addTask,
                                                          updateTask,
                                                          removeTask,
                                                          changeFilter,
                                                          changeStatus,
                                                          filter,
                                                          removeTodoList,
                                                          updateToDoList
                                                      }) => {

    switch (filter) {
        case "Active":
            tasks = {[todoListID]: tasks[todoListID].filter(t => !t.isDone)}
            break
        case "Completed":
            tasks = {[todoListID]: tasks[todoListID].filter(t => t.isDone)}
            break
        default:
            tasks = {...tasks}
    }

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        addTask(todoListID, newTaskTitle)
    }, [addTask, todoListID])

    const updateTaskHandler = (tID: string, newTitle: string) => {
        updateTask(todoListID, tID, newTitle)
    }

    const updateToDoListHandler = (newTitle: string) => {
        updateToDoList(todoListID, newTitle)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListID)
    }

    const listItems: Array<JSX.Element> = tasks[todoListID].map((task) => {
        const onClickRemoveTaskHandler = () => removeTask(todoListID, task.id)
        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(todoListID, task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox onChange={onStatusChangeHandler} checked={task.isDone}/>
                <EditableSpan oldTitle={task.title} onClick={(newTitle) => updateTaskHandler(task.id, newTitle)}/>
                <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks[todoListID].length
        ? <ul>{listItems}</ul>
        : <span>Your tasks list is empty</span>

    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan oldTitle={title} onClick={updateToDoListHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm onClick={addTaskHandler}/>
                {tasksList}
                <div>
                    <Button variant={filter === "All" ? "outlined" : "contained"} color="success" size={"small"}
                            onClick={() => changeFilter(todoListID, "All")}>All
                    </Button>
                    <Button variant={filter === "Active" ? "outlined" : "contained"} color="primary" size={"small"}
                            onClick={() => changeFilter(todoListID, "Active")}>Active
                    </Button>
                    <Button variant={filter === "Completed" ? "outlined" : "contained"} color="error" size={"small"}
                            onClick={() => changeFilter(todoListID, "Completed")}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};
