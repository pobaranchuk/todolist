import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

export type ToDoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}

const ToDoList: React.FC<ToDoListPropsType> = ({title, tasks, removeTask, changeFilter, addTask, changeStatus, filter, todoListID}) => {

    const listItems: Array<JSX.Element> = tasks.map((task) => {
        const onClickRemoveTaskHandler = () =>  removeTask(task.id)
        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {changeStatus(task.id, e.currentTarget.checked)}
        return (
            <li key={task.id} className={task.isDone ? "is-done": ""}>
                <input type="checkbox" onChange={onStatusChangeHandler} checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>✖</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if(e.key === 'Enter'){
            if(newTaskTitle.trim() !== ""){
                addTask(newTaskTitle);
                setNewTaskTitle("")// очистить поле инпута после нажания на плюс. То есть будет перерисовка в поле инпут
            }
            else {
                setError("Title is required!")
            }
        }
    }
    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== ""){
            addTask(newTaskTitle);
            setNewTaskTitle("")// очистить поле инпута после нажания на плюс. То есть будет перерисовка в поле инпут
        }
        else {
            setError("Title is required!")
        }
    }

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={newTaskTitle}
                           onChange = {onChangeHandler}
                           onKeyDown = {onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick = {addTaskHandler}>+</button>
                    {error && <div className={"error-message"}>{error}</div>}
                </div>
                {tasksList}
                <div>
                    <button className={filter === "All" ? "active-filter": ""} onClick={(e)=>changeFilter("All")}>All</button>
                    <button className={filter === "Active" ? "active-filter": ""} onClick={(e)=>changeFilter("Active")}>Active</button>
                    <button className={filter === "Completed" ? "active-filter": ""} onClick={(e)=>changeFilter("Completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;