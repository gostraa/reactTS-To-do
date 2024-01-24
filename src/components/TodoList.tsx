import { ChangeEvent } from "react";
import { FilterValueType } from "../App";
import "../index.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  changeToDolistTitle: (todolistId: string, newTitle: string) => void;
};

const TodoList = (props: PropsType) => {
  const onAllFilter = () => props.changeFilter("all", props.id);
  const onActiveFilter = () => props.changeFilter("active", props.id);
  const onCompletedFilter = () => props.changeFilter("completed", props.id);
  const removeToDoListt = () => props.removeToDoList(props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeToDolistTitle = (newTitle: string) => {
    props.changeToDolistTitle(props.id, newTitle);
  };

  const toMap = props.task;
  return (
    <div>
      <h2 className="todo-title">
        <EditableSpan title={props.title} onChange={changeToDolistTitle} />

        <button onClick={removeToDoListt}>X</button>
      </h2>

      <AddItemForm addItem={addTask} />
      <ul className="todo-list">
        {toMap.map((item) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.chengeStatus(item.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(item.id, newValue, props.id);
            //  props.chengeStatus(item.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={item.id} className={item.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={onChangeStatusHandler}
                className="checkmark"
              />
              <EditableSpan
                title={item.title}
                onChange={onChangeTitleHandler}
              />

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
