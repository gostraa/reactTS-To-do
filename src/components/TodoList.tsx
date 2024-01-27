import { ChangeEvent } from "react";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

import "../index.css";

import { FilterValueType } from "../App";
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
        <IconButton onClick={removeToDoListt}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
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
              <Checkbox
                checked={item.isDone}
                onChange={onChangeStatusHandler}
                className="checkmark"
              />
              <EditableSpan
                title={item.title}
                onChange={onChangeTitleHandler}
              />

              <IconButton
                onClick={() => {
                  props.removeTask(item.id, props.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <Button
        variant={props.filter === "all" ? "contained" : "text"}
        onClick={onAllFilter}
      >
        all
      </Button>
      <Button
        color={"success"}
        variant={props.filter === "active" ? "contained" : "text"}
        onClick={onActiveFilter}
      >
        active
      </Button>
      <Button
        color={"error"}
        variant={props.filter === "completed" ? "contained" : "text"}
        onClick={onCompletedFilter}
      >
        completed
      </Button>
    </div>
  );
};

export default TodoList;
