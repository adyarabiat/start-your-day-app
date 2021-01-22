import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    task: "",
    id: 1,
    completed: false,
    text: "",
    edit: false,
  });

  const handleInputChange = (e) => {
    setTodo({ ...todo, task: e.target.value, id: uuidv4() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // add todo to the todos array
    if (todo.task.trim()) {
      addTodo(todo);
    }

    // reset the input field
    setTodo({ ...todo, task: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleInputChange}
        type="text"
        value={todo.task}
        style={{ width: "500px" }}
        id="standard-basic"
        label="What is your plan today"
      />
    </form>
  );
};

export default TodoForm;
