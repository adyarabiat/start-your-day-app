import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const Todo = ({
  todos,
  removeTodo,
  toggleCompleted,
  toggleEdit,
  changeEditedTask,
}) => {
  const handleRemoveClick = (id) => {
    removeTodo(id);
  };

  const handleCheckboxClick = (id) => {
    toggleCompleted(id);
  };

  const handleEdit = (id) => {
    toggleEdit(id);
  };
  const handleEditedValue = (e, id) => {
    changeEditedTask(e, id);
  };
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <Checkbox
              inputProps={{ "aria-label": "primary checkbox" }}
              onChange={() => handleCheckboxClick(todo.id)}
            />
            <span
              style={{
                display: "inline",
                textDecoration: todo.completed ? "line-through" : null,
              }}
            >
              {todo.edit ? (
                <TextField
                  onChange={(e) => handleEditedValue(e.target.value, todo.id)}
                  type="text"
                  value={todo.task}
                  style={{ width: "300px" }}
                />
              ) : (
                todo.task
              )}
            </span>
            <span style={{ margin: "10px" }}>
              {todo.completed ? todo.text : null}
            </span>

            <Button onClick={() => handleEdit(todo.id)}>
              {todo.edit ? "Save" : "Edit"}
            </Button>
            <Button onClick={() => handleRemoveClick(todo.id)}>X</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
