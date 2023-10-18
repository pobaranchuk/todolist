import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TaskListType = {
    [todolistId: string]: TaskType[]
}

export type ToDoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskListType
    addTask: (todolistID: string, title: string) => void
    updateTask: (todolistID: string,  taskID: string, title: string) => void
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


    const addTaskHandler = (newTaskTitle: string) => {
        addTask(todoListID, newTaskTitle)
    }

    const updateTaskHandler = (tID:string,newTitle: string) => {
        updateTask(todoListID, tID, newTitle)
    }

    const updateToDoListHandler =(newTitle:string) => {
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
                <input type="checkbox" onChange={onStatusChangeHandler} checked={task.isDone}/>
                <EditableSpan oldTitle={task.title} onClick={(newTitle)=>updateTaskHandler(task.id, newTitle)}/>
                <button onClick={onClickRemoveTaskHandler}>✖</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks[todoListID].length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>

    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan oldTitle={title} onClick={updateToDoListHandler}/>
                    {/*{title}*/}
                    <button onClick={removeTodoListHandler}>✖</button>
                </h3>
                <AddItemForm onClick={addTaskHandler} />
                {tasksList}
                <div>
                    <Button variant="contained" size={"small"} className={filter === "All" ? "active-filter" : ""}
                            onClick={() => changeFilter(todoListID, "All")}>All
                    </Button>
                    <button className={filter === "Active" ? "active-filter" : ""}
                            onClick={() => changeFilter(todoListID, "Active")}>Active
                    </button>
                    <button className={filter === "Completed" ? "active-filter" : ""}
                            onClick={() => changeFilter(todoListID, "Completed")}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};
