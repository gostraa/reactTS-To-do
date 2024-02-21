import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValueType;
};

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType
  | AddTodoListActionType;

const initialState: Array<TodoListType> = [];
export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST":
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];

    case "CHANGE-TODOLIST-TITLE": {
      const currentList = state.find((tl) => tl.id === action.id);
      if (currentList) {
        currentList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }

      return [...state];
    }

    default:
      return state;
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() };
};

export const changeTodoListTitleAC = (
  todoListId: string,
  title: string
): ChangeTodoListTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", title: title, id: todoListId };
};

export const changeTodoListFilterAC = (
  todoListId: string,
  filter: FilterValueType
): ChangeTodoListFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: todoListId };
};
