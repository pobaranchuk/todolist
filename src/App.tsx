import React from 'react';
import './App.css';
import './ToDoList';
import ToDoList from "./ToDoList";

function App() {
    return (
        <div className="App">
            <ToDoList title={"What to learn"}/>
            <ToDoList title={"What to buy"}/>
        </div>
    );
}

export default App;
