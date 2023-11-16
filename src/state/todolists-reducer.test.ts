import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType>
let newTodolistTitle: string

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    newTodolistTitle = "New Todolist"

    startState= [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {


    // const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };

    // const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "Completed";

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistId2,
    //     filter: newFilter
    // };

    // const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, changeFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});