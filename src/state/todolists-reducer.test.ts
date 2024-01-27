import { v1 } from "uuid";
import { FilterValueType, TodoListType } from "../App";
import {
  ChangeTodoListFilterActionType,
  ChangeTodoListTitleActionType,
  todolistsReducer,
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
  let TLId1 = v1();
  let TLId2 = v1();

  const startState: Array<TodoListType> = [
    { id: TLId1, title: "What to learn?", filter: "all" },
    { id: TLId2, title: "What to buy?", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "REMOVE-TODOLIST",
    id: TLId1,
  });

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(TLId2);
});

test("correct todolist should be added", () => {
  let TLId1 = v1();
  let TLId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: TLId1, title: "What to learn?", filter: "all" },
    { id: TLId2, title: "What to buy?", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
  });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should it's name", () => {
  let TLId1 = v1();
  let TLId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: TLId1, title: "What to learn?", filter: "all" },
    { id: TLId2, title: "What to buy?", filter: "all" },
  ];

  const action: ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: TLId2,
    title: newTodolistTitle,
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn?");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let TLId1 = v1();
  let TLId2 = v1();

  let newFilter: FilterValueType = "completed";

  const startState: Array<TodoListType> = [
    { id: TLId1, title: "What to learn?", filter: "all" },
    { id: TLId2, title: "What to buy?", filter: "all" },
  ];

  const action: ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: TLId2,
    filter: newFilter,
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
