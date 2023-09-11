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



const ToDoList: React.FC<ToDoListPropsType> = (props) => {

    const {title, tasks} = props;

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
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