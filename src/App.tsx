import React, {useState} from 'react';
import './App.css';
import './ToDoList';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

//CRUD
function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    //redux

    // const [tasks, setTasks] = useState([
    //     {id: v1(), isDone: true, title: "HTML&CSS"},
    //     {id: v1(), isDone: true, title: "JS/TS"},
    //     {id: v1(), isDone: false, title: "REACT"},
    //     {id: v1(), isDone: true, title: "REDUX"}
    // ])

    const removeTask = (todolistId: string ,taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=> t.id !== taskId)})
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
// UI:
    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})
    }

    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    const removeTodoList = (todolistID: string) =>  {
        setTodoLists(todoLists.filter(el => el.id!==todolistID))
        delete tasks[todolistID]
    }

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

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    return (
        <div className="App">
            {todoLists.map((ul) => {
                return <ToDoList
                    key={ul.id}
                    todoListID={ul.id}
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
