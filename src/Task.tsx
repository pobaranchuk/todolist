import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent} from 'react'
import {EditableSpan} from './EditableSpan'
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             todolistId
                                                         }) => {

    const dispatch = useDispatch()


    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue ? TaskStatuses.Completed: TaskStatuses.New, todolistId))
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})
