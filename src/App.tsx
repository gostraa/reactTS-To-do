import { useState } from "react";
import TodoList, { TaskI } from "./components/TodoList";
import "./index.css";
import { v1 } from "uuid";

export type FilterValueType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

function App() {
  let TLId1 = v1();
  let TLId2 = v1();
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: TLId1, title: "What to lern?", filter: "active" },
    { id: TLId2, title: "What to buy?", filter: "completed" },
  ]);

  let [tasksObj, setTasksObj] = useState({
    [TLId1]: [
      { id: v1(), title: "TypeScript", isDone: true },
      { id: v1(), title: "Angular", isDone: false },
      { id: v1(), title: "English", isDone: true },
      { id: v1(), title: "React Development", isDone: false },
    ],
    [TLId2]: [
      { id: v1(), title: "Database Optimization", isDone: false },
      { id: v1(), title: "User Interface Design", isDone: false },
      { id: v1(), title: "API Integration", isDone: true },
      { id: v1(), title: "Automated Testing", isDone: false },
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

  function removeToDoList(todolistId: string) {
    let filteredList = todoLists.filter((tl) => tl.id !== todolistId);
    setTodoLists(filteredList);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  }

  return (
    <div>
      <h1>Welcome to time managment space</h1>
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
              filter={tl.filter}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
