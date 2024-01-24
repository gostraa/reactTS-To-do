import { useState } from "react";
import TodoList, { TaskI } from "./components/TodoList";
import "./index.css";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterValueType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TaskObjStateType = {
  [key: string]: Array<TaskI>;
};

function App() {
  let TLId1 = v1();
  let TLId2 = v1();
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: TLId1, title: "What to lern?", filter: "all" },
    { id: TLId2, title: "What to buy?", filter: "all" },
  ]);

  let [tasksObj, setTasksObj] = useState<TaskObjStateType>({
    [TLId1]: [
      { id: v1(), title: "TypeScript", isDone: true },
      { id: v1(), title: "Angular", isDone: false },
      { id: v1(), title: "English", isDone: true },
      { id: v1(), title: "React Development", isDone: false },
    ],
    [TLId2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Vegetables", isDone: false },
      { id: v1(), title: "Fruits", isDone: true },
      { id: v1(), title: "Ice cream", isDone: false },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todoLists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todolistId];
    const newTasksArr = [newTask, ...tasks];
    tasksObj[todolistId] = newTasksArr;
    setTasksObj({ ...tasksObj });
  }

  function chengeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;

      setTasksObj({ ...tasksObj });
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;

      setTasksObj({ ...tasksObj });
    }
  }

  function removeToDoList(todolistId: string) {
    let filteredList = todoLists.filter((tl) => tl.id !== todolistId);
    setTodoLists(filteredList);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  }

  function addToDoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodoLists([todolist, ...todoLists]);
    setTasksObj({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  function changeToDolistTitle(todolistId: string, newTitle: string) {
    const currentList = todoLists.find((tl) => tl.id === todolistId);
    if (currentList) {
      currentList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }

  return (
    <div className="main-container">
      <AddItemForm addItem={addToDoList} />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <div className="todo-container" key={tl.id}>
            <TodoList
              id={tl.id}
              title={tl.title}
              task={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              chengeStatus={chengeStatus}
              removeToDoList={removeToDoList}
              changeTaskTitle={changeTaskTitle}
              filter={tl.filter}
              changeToDolistTitle={changeToDolistTitle}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
