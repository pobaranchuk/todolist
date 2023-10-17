import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    onClick: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({oldTitle, onClick}) => {

    const [edit, setEdit] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onClick(newTaskTitle)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        edit ? <input value={newTaskTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/> :
            <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};
