import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Delete from "@mui/icons-material/Delete";
import "./todo.css";
import { IconButton } from "@mui/material";

const ToDo = ({ toDo, completeChange, deleteToDo }) => {
  return (
    <div className="wrapper-todo">
      <FormControlLabel
        data-testid="control"
        className={toDo.complete ? "completed" : ""}
        control={
          <Checkbox
            data-testid="checkbox"
            checked={toDo.complete}
            onChange={() => completeChange(toDo)}
          />
        }
        label={toDo.task}
      />

      <IconButton
        data-testid="delete-icon"
        aria-label="delete"
        onClick={() => deleteToDo(toDo)}
      >
        <Delete />
      </IconButton>
    </div>
  );
};

export default ToDo;
