import { v1 } from "uuid";
import { TaskObjStateType } from "../App";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
  TLId1,
  TLId2,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todoListId: string;
  taskID: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};
export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  todoListId: string;
  isDone: boolean;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  todoListId: string;
  title: string;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType;

const initialState: TaskObjStateType = {
  [TLId1]: [
    { id: v1(), title: "TypeScript", isDone: true },
    { id: v1(), title: "Angular", isDone: false },
    { id: v1(), title: "English", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ],
  [TLId2]: [
    { id: v1(), title: "Milk", isDone: false },
    { id: v1(), title: "Vegetables", isDone: false },
    { id: v1(), title: "Fruits", isDone: true },
    { id: v1(), title: "Ice cream", isDone: false },
  ],
};
export const tasksReducer = (
  state: TaskObjStateType = initialState,
  action: ActionsType
): TaskObjStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskID);
      stateCopy[action.todoListId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const newTasks = [
        {
          id: v1(),
          title: action.title,
          isDone: false,
        },
        ...tasks,
      ];
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const taskToChange = tasks.find((t) => t.id === action.taskId);
      if (taskToChange) {
        taskToChange.isDone = action.isDone;
      }

      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const taskToChange = tasks.find((t) => t.id === action.taskId);
      if (taskToChange) {
        taskToChange.title = action.title;
      }

      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];

      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];

      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  taskID: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todoListId, taskID };
};

export const addTaskAC = (
  title: string,
  todoListId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeTaskStatusAC = (
  taskId: string,
  todoListId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone };
};

export const changeTaskTitleAC = (
  taskId: string,
  todoListId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, todoListId, title };
};
