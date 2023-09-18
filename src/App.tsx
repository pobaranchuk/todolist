import React, {useState} from 'react';
import './App.css';
import './ToDoList';
import ToDoList, {TaskType} from "./ToDoList";

export type FilterValuesType = "All"|"Active"|"Completed"

//CRUD
function App() {
    //BLL
    const toDoListTitle_1: string = "What to learn";
    //redux
    const [tasks, setTasks] =  useState ([
        { id: 1, isDone: true, title: "HTML&CSS"},
        { id: 2, isDone: true, title: "JS/TS"},
        { id: 3, isDone: false, title: "REACT"},
        { id: 4, isDone: true, title: "REDUX"}
    ])
    const removeTask = (taskId: number) => {
        const newTask : Array<TaskType> = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId){
                newTask.push(tasks[i]);
            }
        }
        setTasks(newTask);
    }
// UI:
    const [filter, setFilter] = useState<FilterValuesType>("All")
    const getFilteredTasksForRender = (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "Active":
                return  allTasks.filter(task => !task.isDone)
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
    return (
        <div className="App">
            <ToDoList
                tasks={filteredTasksForRender}
                title={toDoListTitle_1}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
