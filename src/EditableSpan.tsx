import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({value, onChange}) => {

    const [edit, setEdit] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState(value)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onChange(newTaskTitle)
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        edit ? <TextField value={newTaskTitle} onChange={onChangeTitle} autoFocus onBlur={editHandler}/> :
            <span onDoubleClick={editHandler}>{value}</span>
    )
})
