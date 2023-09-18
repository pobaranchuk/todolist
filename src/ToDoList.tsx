import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    isDone: boolean,
    title: string
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
}

const ToDoList: React.FC<ToDoListPropsType> = ({title, tasks, removeTask, changeFilter}) => {

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

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                {tasksList}
                <div>
                    <button onClick={()=>changeFilter("All")}>All</button>
                    <button onClick={()=>changeFilter("Active")}>Active</button>
                    <button onClick={()=>changeFilter("Completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;