import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskType} from "./ToDoList";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

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
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }

    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
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
