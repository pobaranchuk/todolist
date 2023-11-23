import React, {ChangeEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
    onClick: (title: string) => void
}


export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({onClick}) => {

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
        if(error) setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const stylesButton = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor: 'blue'
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? error : "type something..."}
                       variant="outlined"
                       value={newTaskTitle}
                       size={"small"}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       // className={error ? "error" : ""}
            />
            <Button onClick={addTaskHandler} style={stylesButton}>+</Button>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    );
})