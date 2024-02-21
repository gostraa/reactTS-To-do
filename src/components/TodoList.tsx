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

  changeFilter: (value: FilterValueType, todolistId: string) => void;

  removeToDoList: (todolistId: string) => void;

  changeToDolistTitle: (todolistId: string, newTitle: string) => void;
};

const TodoList = (props: PropsType) => {
  const onAllFilter = () => props.changeFilter("all", props.id);
  const onActiveFilter = () => props.changeFilter("active", props.id);
  const onCompletedFilter = () => props.changeFilter("completed", props.id);
  const removeToDoListt = () => props.removeToDoList(props.id);

  const dispatch = useDispatch();

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function chengeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskId, todolistId, isDone));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    dispatch(changeTaskTitleAC(taskId, todolistId, newTitle));
  }

  const handleAddTask = (title: string) => {
    addTask(title, props.id);
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

      <AddItemForm addItem={handleAddTask} />
      <ul className="todo-list">
        {toMap.map((item) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            chengeStatus(item.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            changeTaskTitle(item.id, newValue, props.id);
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
                  removeTask(item.id, props.id);
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
