import { ChangeEvent } from "react";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

import "../index.css";

import { FilterValueType } from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../state/tasks-reducer";
import { useDispatch } from "react-redux";
import { AppRootStore } from "../state/store";
import { useSelector } from "react-redux";

export interface TaskI {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  id: string;
  title: string;
  filter: FilterValueType;

  changeFilter: (value: FilterValueType, todolistId: string) => void;

  removeToDoList: (todolistId: string) => void;

  changeToDolistTitle: (todolistId: string, newTitle: string) => void;
};

const TodoList = (props: PropsType) => {
  const onAllFilter = () => props.changeFilter("all", props.id);
  const onActiveFilter = () => props.changeFilter("active", props.id);
  const onCompletedFilter = () => props.changeFilter("completed", props.id);
  const removeToDoListt = () => props.removeToDoList(props.id);
  const tasks = useSelector<AppRootStore, Array<TaskI>>(
    (state) => state.tasks[props.id]
  );

  const dispatch = useDispatch();

  const changeToDolistTitle = (newTitle: string) => {
    props.changeToDolistTitle(props.id, newTitle);
  };

  let tasksForTodoList = tasks;

  if (props.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t?.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => t?.isDone === false);
  }

  const toMap = tasksForTodoList;
  return (
    <div>
      <h2 className="todo-title">
        <EditableSpan title={props.title} onChange={changeToDolistTitle} />
        <IconButton onClick={removeToDoListt}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </h2>

      <AddItemForm
        addItem={(title) => {
          dispatch(addTaskAC(title, props.id));
        }}
      />
      <ul className="todo-list">
        {toMap.map((item) => {
          return (
            <li key={item.id} className={item.isDone ? "is-done" : ""}>
              <Checkbox
                checked={item.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    changeTaskStatusAC(
                      item.id,
                      props.id,
                      e.currentTarget.checked
                    )
                  );
                }}
                className="checkmark"
              />
              <EditableSpan
                title={item.title}
                onChange={(newValue: string) => {
                  dispatch(changeTaskTitleAC(item.id, props.id, newValue));
                }}
              />

              <IconButton
                onClick={() => {
                  dispatch(removeTaskAC(item.id, props.id));
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
