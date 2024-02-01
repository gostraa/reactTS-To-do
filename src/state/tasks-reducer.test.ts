import { TaskObjStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodoListAC, removeTodoListAC } from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: false },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: false },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "TLId2");

  const endState = tasksReducer(startState, action);
  expect(endState["TLId1"].length).toBe(4);
  expect(endState["TLId2"].length).toBe(3);
  expect(endState["TLId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: false },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: false },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = addTaskAC("Juce", "TLId2");

  const endState = tasksReducer(startState, action);
  expect(endState["TLId1"].length).toBe(4);
  expect(endState["TLId2"].length).toBe(5);
  expect(endState["TLId2"][0].id).toBeDefined();
  expect(endState["TLId2"][0].title).toBe("Juce");
  expect(endState["TLId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: true },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: true },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", "TLId2", false);

  const endState = tasksReducer(startState, action);

  expect(endState["TLId1"][1].isDone).toBe(true);
  expect(endState["TLId2"][1].isDone).toBe(false);
});

test("title of specified task should be changed", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: true },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: true },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "TLId2", "Meat");

  const endState = tasksReducer(startState, action);

  expect(endState["TLId1"][1].title).toBe("Angular");
  expect(endState["TLId2"][1].title).toBe("Meat");
});

test("new array should be added to jbject when new to-do list is added", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: true },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: true },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = addTodoListAC("title no matter");

  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "TLId1" && k !== "TLId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with dotolistId should be deleted", () => {
  const startState: TaskObjStateType = {
    TLId1: [
      { id: "1", title: "TypeScript", isDone: true },
      { id: "2", title: "Angular", isDone: true },
      { id: "3", title: "English", isDone: true },
      { id: "4", title: "React", isDone: false },
    ],
    TLId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Vegetables", isDone: true },
      { id: "3", title: "Fruits", isDone: true },
      { id: "4", title: "Ice cream", isDone: false },
    ],
  };

  const action = removeTodoListAC("TLId2");

  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["TLId2"]).toBeUndefined();
});
