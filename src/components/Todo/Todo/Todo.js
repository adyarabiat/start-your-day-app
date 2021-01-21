import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Todo = ({ todos, removeTodo, toggleCompleted }) => {
  const handleRemoveClick = (id) => {
    removeTodo(id);
  };

  const handleCheckboxClick = (id) => {
    toggleCompleted(id);
  };
  return (
    <div>
      {todos.map((todo) => {
        return (
          <Typography key={todo.id}>
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
              {todo.task}
            </span>
            <span>{todo.completed ? todo.text : null}</span>
            <Button onClick={() => handleRemoveClick(todo.id)}>X</Button>
          </Typography>
        );
      })}
    </div>
  );
};

export default Todo;
