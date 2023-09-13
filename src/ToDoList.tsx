import React from 'react';

export type TaskType = {
    id: number,
    isDone: boolean,
    title: string
}

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
}
const ToDoList = (props: ToDoListPropsType) => {

    return (
        <div className="todolist">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((w)=> {
                        return (
                            <li>
                                <input type="checkbox" checked={w.isDone}/>
                                <span>{w.title}</span>
                            </li>
                        )}
                    )}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};


export default ToDoList;