import React, {useCallback, useMemo} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";

export type ToDoListPropsType = {
    id: string
    todoListID: string
    title: string
    tasks: TaskType[]
    addTask: (todolistID: string, title: string) => void
    updateTaskTitle: (todolistID: string, taskID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeToDoListFilter: (todoListID: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    updateToDoListTitle: (todolistID: string, newTitle: string) => void
}

export const ToDoList: React.FC<ToDoListPropsType> = React.memo(({
                                                                     todoListID,
                                                                     title,
                                                                     tasks,
                                                                     addTask,
                                                                     changeToDoListFilter,
                                                                     filter,
                                                                     removeTodoList,
                                                                     updateToDoListTitle
                                                                 }) => {

    let tasksForTodolist = tasks

    tasksForTodolist = useMemo(() => {
        if (filter === "Active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
        }
        if (filter === "Completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
        }
        return tasksForTodolist
    }, [filter, tasks])

    const addTaskHandler = useCallback((newTaskTitle: string) => {
        addTask(todoListID, newTaskTitle)
    }, [addTask, todoListID])

    const removeTodoListHandler = () => {
        removeTodoList(todoListID)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        updateToDoListTitle(todoListID, newTitle)
    }, [updateToDoListTitle, todoListID])

    // const changeTaskTitle = (tID: string, newTitle: string) => {
    //     updateTaskTitle(todoListID, tID, newTitle)
    // }

    const onAllClickHandler = useCallback(() => changeToDoListFilter(todoListID, "All"), [changeToDoListFilter, todoListID])
    const onActiveClickHandler = useCallback(() => changeToDoListFilter(todoListID, "Active"), [changeToDoListFilter, todoListID])
    const onCompletedClickHandler = useCallback(() => changeToDoListFilter(todoListID, "Completed"), [changeToDoListFilter, todoListID])

    // const listItems: Array<JSX.Element> = tasks[todoListID].map((task) => {
    //     const onClickRemoveTaskHandler = () => removeTask(todoListID, task.id)
    //     const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //         changeTaskStatus(todoListID, task.id, e.currentTarget.checked)
    //     }
    //     return (
    //         <li key={task.id} className={task.isDone ? "is-done" : ""}>
    //             <Checkbox onChange={onStatusChangeHandler} checked={task.isDone}/>
    //             <EditableSpan value={task.title} onChange={(newTitle) => changeTaskTitle(task.id, newTitle)}/>
    //             <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
    //                 <DeleteIcon/>
    //             </IconButton>
    //         </li>
    //     )
    // })
    //
    // const tasksList: JSX.Element = tasks[todoListID].length
    //     ? <ul>{listItems}</ul>
    //     : <span>Your tasks list is empty</span>

    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitle}/>
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
                <AddItemForm onClick={addTaskHandler}/>
                {
                    tasksForTodolist.map(task => <Task
                        key={task.id}
                        task={task}
                        todolistId={todoListID}
                    />)
                }
                {/*{tasksList}*/}
                <div style={{paddingTop: '10px'}}>
                    <Button variant={filter === "All" ? "outlined" : "text"}
                              color="success"
                              size={"small"}
                              onClick={onAllClickHandler}>All
                    </Button>
                    <Button variant={filter === "Active" ? "outlined" : "text"}
                              color="primary"
                              size={"small"}
                              onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button variant={filter === "Completed" ? "outlined" : "text"}
                              color="error"
                              size={"small"}
                              onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})

// interface IMyButton extends ButtonProps {
// }
//
// // const MyButton = memo((props: IMyButton) => {
// //     return <Button variant={props.variant}
// //                    onClick={props.onClick}
// //                    color={props.color}>{props.title}
// //     </Button>
// // })
