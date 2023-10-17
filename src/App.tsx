import React, {useState} from 'react';
import './App.css';
import './ToDoList';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Candies", isDone: false},
            {id: v1(), title: "Coca cola", isDone: false},
        ]
    });

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const updateTask = (todolistID: string,  taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el=>el.id === taskID ? {...el, title : title}: el )})
    }

    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})
    }

    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))

    }
    const addTodoList = (title: string) => {
        let newToDoListId = v1()
        const newToDoList: TodoListType = {id: newToDoListId, title: title, filter: 'All'}
        setTodoLists([...todoLists, newToDoList])
        setTasks({...tasks, [newToDoListId]:[]})
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    const updateToDoList =(todolistID: string, newTitle: string) => {
        setTodoLists(todoLists.map(el=>el.id===todolistID ? {...el,title:newTitle} : el))
    }

    return (
        <div className="App">
            <AddItemForm onClick={addTodoList}/>
            {todoLists.map((ul) => {
                return <ToDoList
                    key={ul.id}
                    todoListID={ul.id}
                    title={ul.title}
                    tasks={tasks}
                    addTask={addTask}
                    updateTask={updateTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={ul.filter}
                    removeTodoList={removeTodoList}
                    updateToDoList={updateToDoList}
                />
            })}

        </div>
    );
}

export default App;
