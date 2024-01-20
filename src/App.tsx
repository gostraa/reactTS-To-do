import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  let tasks = [
    { id: 1, title: "TypeScript", isDone: true },
    { id: 2, title: "Angular", isDone: false },
    { id: 3, title: "English", isDone: true },
  ];
  let movies = [
    { id: 1, title: "Spiderman", isDone: true },
    { id: 2, title: "Terminator", isDone: false },
    { id: 3, title: "Titanic", isDone: true },
  ];
  return (
    <div className="todo-container">
      <h1>Welcome to time managment space</h1>
      <TodoList title="what to learn?" task={tasks} />
      <TodoList title="Movies" task={movies} />
    </div>
  );
}

export default App;
