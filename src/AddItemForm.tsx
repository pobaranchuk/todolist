import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType ={
    onClick: ( title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({onClick}) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            onClick(newTaskTitle);
            setNewTaskTitle("")// очистить поле инпута после нажания на плюс. То есть будет перерисовка в поле инпут
        } else {
            setError("Title is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            if (newTaskTitle.trim() !== "") {
                onClick(newTaskTitle);
                setNewTaskTitle("")// очистить поле инпута после нажания на плюс. То есть будет перерисовка в поле инпут
            } else {
                setError("Title is required!")
            }
        }
    }


    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};