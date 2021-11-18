import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TodoList from "./components/todo-list";
import TodoForm from "./components/todo-form";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

function App({ http }) {
  const [completeToDos, setCompleteToDos] = useState([]);
  const [incompleteToDos, setIncompleteToDos] = useState([]);
  const [partialTodo, setPartialTodo] = useState({ task: "" });

  const addToDo = () => {
    if (!partialTodo.task) return;
    setIncompleteToDos((incompleteToDos) => [
      ...incompleteToDos,
      { ...partialTodo, id: uuidv4(), complete: false },
    ]);
    setPartialTodo({ task: "" });
  };

  const onAddToDoChange = (toDo) => {
    setPartialTodo(toDo);
  };

  const onCompleteToDo = (toDo) => {
    setIncompleteToDos((incompleteToDos) =>
      incompleteToDos.filter(({ id }) => id !== toDo.id)
    );
    setCompleteToDos((completeToDos) => [
      ...completeToDos,
      { ...toDo, complete: true },
    ]);
  };

  const onIncompleteToDo = (toDo) => {
    setCompleteToDos((completeToDos) =>
      completeToDos.filter(({ id }) => id !== toDo.id)
    );
    setIncompleteToDos((incompleteToDos) => [
      ...incompleteToDos,
      { ...toDo, complete: false },
    ]);
  };

  const deleteToDo = async (toDo) => {
    try {
      await http.delete(toDo);
      setCompleteToDos((completeToDos) =>
        completeToDos.filter(({ id }) => id !== toDo.id)
      );
      setIncompleteToDos((incompleteToDos) =>
        incompleteToDos.filter(({ id }) => id !== toDo.id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cards">
      <div className="center">
        <div className="wrapper">
          <Card sx={{ minWidth: 275 }}>
            <CardHeader title="To Do List" />
            <CardContent>
              {incompleteToDos.length ? (
                <TodoList
                  toDos={incompleteToDos}
                  toDoChange={onCompleteToDo}
                  deleteToDo={deleteToDo}
                />
              ) : (
                <h4>All Done!! 🏖</h4>
              )}
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardHeader title="Add To Do" />
            <CardContent>
              <TodoForm
                handleChange={onAddToDoChange}
                partialToDo={partialTodo}
              />
            </CardContent>
            <CardActions className="button-container">
              <Button
                data-testid="add-todo"
                className="add-button"
                variant="text"
                onClick={addToDo}
              >
                Add To Do
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardHeader title="Completed 🎉" />
            <CardContent>
              <TodoList
                toDos={completeToDos}
                toDoChange={onIncompleteToDo}
                deleteToDo={deleteToDo}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
