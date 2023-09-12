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



const ToDoList: React.FC<ToDoListPropsType> = ({title, tasks}) => { //3. Деструктуризация сразу
    //1.
    //const title = props.title;
    //const tasks = props.tasks;
    //2.
    //const {title, tasks} = props;

    return (
        <div className="todolist">
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li>
                        <input type="checkbox" checked={tasks[0].isDone}/>
                        <span>{tasks[0].title}</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={tasks[1].isDone}/>
                        <span>{tasks[1].title}</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={tasks[2].isDone}/>
                        <span>{tasks[2].title}</span>
                    </li>
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