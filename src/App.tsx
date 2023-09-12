import React from 'react';
import './App.css';
import './ToDoList';
import ToDoList, {TaskType} from "./ToDoList";


function App() {
    const toDoListTitle_1: string = "What to learn";
    const toDoListTitle_2: string = "What to learn";

    const tasks_1: Array<TaskType> = [
        { id: 1, isDone: true, title: "HTML&CSS"},
        { id: 2, isDone: true, title: "JS"},
        { id: 3, isDone: false, title: "ReactJS"}
    ]
    const tasks_2: Array<TaskType> = [
        { id: 1, isDone: true, title: "Hello world"},
        { id: 2, isDone: true, title: "I am Happy"},
        { id: 3, isDone: true, title: "Yo"}
    ]
    return (
        <div className="App">
            <ToDoList
                title={toDoListTitle_1}
                tasks={tasks_1}
            />
            <ToDoList
                title={toDoListTitle_2}
                tasks={tasks_2}
            />
        </div>
    );
}

export default App;
