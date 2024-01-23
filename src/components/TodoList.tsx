import { ChangeEvent, useState } from "react";
import { FilterValueType } from "../App";
import "../index.css";

export interface TaskI {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  id: string;
  title: string;
  task: TaskI[];
  filter: FilterValueType;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValueType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  chengeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  removeToDoList: (todolistId: string) => void;
};

const TodoList = (props: PropsType) => {
  const [inputData, setInputData] = useState<string>("");
  const [IsError, setIsError] = useState<boolean>(false);

  const onSetInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setInputData(e.currentTarget.value);
  };
  const onAddTask = () => {
    if (inputData.trim() === "") {
      setIsError(true);
      return;
    }
    props.addTask(inputData.trim(), props.id);
    setInputData("");
  };

  const onAllFilter = () => props.changeFilter("all", props.id);
  const onActiveFilter = () => props.changeFilter("active", props.id);
  const onCompletedFilter = () => props.changeFilter("completed", props.id);
  const removeToDoListt = () => props.removeToDoList(props.id);

  const toMap = props.task;
  return (
    <div>
      <h2 className="todo-title">
        {props.title} <button onClick={removeToDoListt}>X</button>
      </h2>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={onSetInputData}
          className={IsError ? "error" : ""}
        />

        <button onClick={onAddTask}>+</button>
        {IsError && <p className="error-message">Field is required</p>}
      </div>
      <ul className="todo-list">
        {toMap.map((item) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.chengeStatus(item.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={item.id} className={item.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={onChangeStatusHandler}
                className="checkmark"
              />

              <span>{item.title}</span>
              <button
                onClick={() => {
                  props.removeTask(item.id, props.id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={props.filter === "all" ? "active-filter" : ""}
        onClick={onAllFilter}
      >
        all
      </button>
      <button
        className={props.filter === "active" ? "active-filter" : ""}
        onClick={onActiveFilter}
      >
        active
      </button>
      <button
        className={props.filter === "completed" ? "active-filter" : ""}
        onClick={onCompletedFilter}
      >
        completed
      </button>
    </div>
  );
};

export default TodoList;
