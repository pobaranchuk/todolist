import React, {useState} from 'react';
import './App.css';
import './ToDoList';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"

//CRUD
function App() {
    //BLL
    const toDoListTitle_1: string = "What to learn";
    //redux
    const [tasks, setTasks] = useState([
        {id: v1(), isDone: true, title: "HTML&CSS"},
        {id: v1(), isDone: true, title: "JS/TS"},
        {id: v1(), isDone: false, title: "REACT"},
        {id: v1(), isDone: true, title: "REDUX"}
    ])
    const removeTask = (taskId: string) => {
        const newTask: Array<TaskType> = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId) {
                newTask.push(tasks[i]);
            }
        }
        setTasks(newTask);
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks] // деструктуризация масива,  копируем старый и добавляем новый элемент в конец
        setTasks(newTasks)
    }
// UI:

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("All")
    const getFilteredTasksForRender = (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "Active":
                return allTasks.filter(task => !task.isDone)
            case "Completed":
                return allTasks.filter(task => task.isDone)
            default:
                return allTasks
        }
    }
    const changeFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    let todoList: Array<> = [
        {id: v1(), title: "What to learn", filter: "Active"},
        {id: v1(), title: "What to buy", filter: "Completed"}
    ]


    return (
        <div className="App">
            {todoList.map((ul) => {
                return <ToDoList
                    title={ul.title}
                    tasks={filteredTasksForRender}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={ul.filter}
                />
            })}

        </div>
    );
}

export default App;
