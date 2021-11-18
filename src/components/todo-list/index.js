import React from "react";
import ToDo from "../todo";
import "./todo-list.css";

const TodoList = ({ toDos, toDoChange, deleteToDo }) => {
  const onCompleteChange = (toDo) => {
    toDoChange({ ...toDo, complete: !toDo.complete });
  };
  return (
    <div className="list" role="list">
      {toDos.map((toDo) => (
        <ToDo
          key={toDo.id}
          toDo={toDo}
          completeChange={onCompleteChange}
          deleteToDo={deleteToDo}
        />
      ))}
    </div>
  );
};

export default TodoList;
