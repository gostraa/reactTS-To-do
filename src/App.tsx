import { useState } from "react";
import TodoList, { TaskI } from "./components/TodoList";
import "./index.css";
import { v1 } from "uuid";

export type FilterValueType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState<TaskI[]>([
    { id: v1(), title: "TypeScript", isDone: true },
    { id: v1(), title: "Angular", isDone: false },
    { id: v1(), title: "English", isDone: true },
    { id: v1(), title: "React Development", isDone: false },
    { id: v1(), title: "Database Optimization", isDone: false },
    { id: v1(), title: "User Interface Design", isDone: false },
    { id: v1(), title: "API Integration", isDone: true },
    { id: v1(), title: "Automated Testing", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  function addTask(title: string) {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTasksArr = [newTask, ...tasks];
    setTasks(newTasksArr);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="todo-container">
      <h1>Welcome to time managment space</h1>
      <TodoList
        title="what to learn?"
        task={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
