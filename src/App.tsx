import React from 'react';
import './App.css';
import './ToDoList';
import ToDoList from "./ToDoList";

function App() {
    const toDoListTitle_1: string = "What to learn";
    const toDoListTitle_2: string = "What to learn";

    return (
        <div className="App">
            <ToDoList title={toDoListTitle_1}/>
            <ToDoList title={toDoListTitle_2}/>
        </div>
    );
}

export default App;
