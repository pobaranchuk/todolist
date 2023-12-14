// import React, {useReducer} from 'react';
// import './App.css';
// import './ToDoList';
// import {ToDoList} from "./ToDoList";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import ButtonAppBar from "./ButtonAppBar";
// import {Container, Grid, Paper} from "@mui/material";
// import {
//     addTodolistAC,
//     changeToDoListFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilterValuesType = "All" | "Active" | "Completed"
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// function AppWithReducer() {
//
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
//         {id: todolistID1, title: 'What to learn', filter: 'All'},
//         {id: todolistID2, title: 'What to buy', filter: 'All'},
//     ])
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "Bread", isDone: true},
//             {id: v1(), title: "Fish", isDone: false},
//             {id: v1(), title: "Candies", isDone: false},
//             {id: v1(), title: "Coca cola", isDone: false},
//         ]
//     });
//
//     const addTask = (todolistID: string, title: string) => {
//         let action = addTaskAC(title, todolistID)
//         dispatchToTasks(action)
//     }
//
//     const removeTask = (todolistId: string, taskId: string) => {
//         dispatchToTasks(removeTaskAC(taskId, todolistId))
//     }
//
//     const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
//         let action = changeTaskTitleAC(taskID, title, todolistID)
//         dispatchToTasks(action)
//     }
//
//     const changeTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses) => {
//         //setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})
//         let action = changeTaskStatusAC(taskID, isDone, todolistID)
//         dispatchToTasks(action)
//     }
//
//     const changeToDoListFilter = (todoListID: string, filter: FilterValuesType) => {
//         //setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
//         let action = changeToDoListFilterAC(filter, todoListID)
//         dispatchToTodoLists(action)
//     }
//
//     const addToDoList = (title: string) => {
//         // let newToDoListId = v1()
//         // const newToDoList: TodoListType = {id: newToDoListId, title: title, filter: 'All'}
//         // setTodoLists([...todoLists, newToDoList])
//         // setTasks({...tasks, [newToDoListId]: []})
//
//         let action = addTodolistAC(title)
//         dispatchToTasks(action)
//         dispatchToTodoLists(action)
//
//
//     }
//
//     const removeToDoList = (todolistID: string) => {
//         let action = removeTodolistAC(todolistID)
//         dispatchToTodoLists(action)
//         delete tasks[todolistID]
//     }
//
//     const updateToDoListTitle = (todolistID: string, newTitle: string) => {
//         let action = changeTodolistTitleAC(todolistID, newTitle)
//         dispatchToTodoLists(action)
//     }
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{margin: "20px"}}>
//                     <AddItemForm onClick={addToDoList}/>
//                 </Grid>
//                 <Grid container>
//                     {todoLists.map((ul) => {
//                         return <Paper elevation={3} style={{padding: '20px', margin: "10px"}}>
//                             <ToDoList
//                                 key={ul.id}
//                                 todoListID={ul.id}
//                                 title={ul.title}
//                                 tasks={tasks}
//                                 addTask={addTask}
//                                 updateTaskTitle={updateTaskTitle}
//                                 removeTask={removeTask}
//                                 changeToDoListFilter={changeToDoListFilter}
//                                 changeTaskStatus={changeTaskStatus}
//                                 filter={ul.filter}
//                                 removeTodoList={removeToDoList}
//                                 updateToDoListTitle={updateToDoListTitle}
//                             />
//                         </Paper>
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducer;

export {}