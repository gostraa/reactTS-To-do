import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import "./index.css";

import AddItemForm from "./components/AddItemForm";
import TodoList, { TaskI } from "./components/TodoList";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "./state/todolists-reducer";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStore } from "./state/store";

export type FilterValueType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TaskObjStateType = {
  [key: string]: Array<TaskI>;
};

function App() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootStore, Array<TodoListType>>(
    (state) => state.todolists
  );

  function changeFilter(value: FilterValueType, todolistId: string) {
    dispatch(changeTodoListFilterAC(todolistId, value));
  }

  function removeToDoList(todolistId: string) {
    dispatch(removeTodoListAC(todolistId));
  }

  function addToDoList(title: string) {
    const action = addTodoListAC(title);
    dispatch(action);
  }

  function changeToDolistTitle(todolistId: string, newTitle: string) {
    dispatch(changeTodoListTitleAC(todolistId, newTitle));
  }

  return (
    <div className="main-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addToDoList} />
        </Grid>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {todoLists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper
                  style={{
                    padding: "14px",
                    maxWidth: "300px",
                  }}
                >
                  <TodoList
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    removeToDoList={removeToDoList}
                    filter={tl.filter}
                    changeToDolistTitle={changeToDolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
