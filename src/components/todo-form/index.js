import React from "react";
import TextField from "@mui/material/TextField";
import "./todo-form.css";

const TodoForm = ({ partialToDo, handleChange }) => {
  return (
    <TextField
      data-testid="input"
      className="input"
      id="standard-basic"
      label="Your toDo"
      variant="standard"
      onChange={(e) => handleChange({ task: e.target.value })}
      value={partialToDo.task}
    />
  );
};

export default TodoForm;
