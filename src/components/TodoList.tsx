import { ChangeEvent, useState } from "react";
import { FilterValueType } from "../App";
import "../index.css";
export interface TaskI {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  title: string;
  task: TaskI[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
};

const TodoList = (props: PropsType) => {
  const [inputData, setInputData] = useState("");

  const onSetInputData = (e: ChangeEvent<HTMLInputElement>) =>
    setInputData(e.currentTarget.value);

  const onAddTask = () => {
    props.addTask(inputData);
    setInputData("");
  };

  const onAllFilter = () => props.changeFilter("all");
  const onActiveFilter = () => props.changeFilter("active");
  const onCompletedFilter = () => props.changeFilter("completed");

  const toMap = props.task;
  return (
    <div>
      <h2 className="todo-title">{props.title}</h2>
      <div>
        <input type="text" value={inputData} onChange={onSetInputData} />
        <button onClick={onAddTask}>+</button>
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
            <button
              onClick={() => {
                props.removeTask(item.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onAllFilter}>all</button>
      <button onClick={onActiveFilter}>active</button>
      <button onClick={onCompletedFilter}>completed</button>
    </div>
  );
};

export default TodoList;
