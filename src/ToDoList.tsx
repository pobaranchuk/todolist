import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
}

const ToDoList: React.FC<ToDoListPropsType> = ({title, tasks, removeTask, changeFilter, addTask}) => {

    const listItems: Array<JSX.Element> = tasks.map((task) => {
        const onClickRemoveTaskHandler = () =>  removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>✖</button>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your tasksList is empty</span>

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle("")// очистить поле инпута после нажания на плюс. То есть будет перерисовка в поле инпут
    }


    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input value={newTaskTitle}
                           onChange = {onChangeHandler}
                           onKeyDown = {onKeyPressHandler}
                    />
                    <button onClick = {addTaskHandler}>+</button>
                </div>
                {tasksList}
                <div>
                    <button onClick={(e)=>changeFilter("All")}>All</button>
                    <button onClick={(e)=>changeFilter("Active")}>Active</button>
                    <button onClick={(e)=>changeFilter("Completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;