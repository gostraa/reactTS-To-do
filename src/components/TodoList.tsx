import "../index.css";
interface TaskI {
  id: number;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  task: TaskI[];
};

const TodoList = (props: PropsType) => {
  const toMap = props.task;
  return (
    <>
      <h2 className="todo-title">{props.title}</h2>
      <div>
        <input type="text" />
        <button>add</button>
      </div>
      <ul className="todo-list">
        {toMap.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              className="checkmark"
              checked={item.isDone}
            />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
