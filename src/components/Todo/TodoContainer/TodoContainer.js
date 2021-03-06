import React, { useState, useEffect } from "react";

import { DateTime } from "../Time/Time";
import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

const TodoContainer = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
            text: "Good Job!",
          };
        }
        return todo;
      })
    );
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            edit: !todo.edit,
          };
        }
        return todo;
      })
    );
  };

  const changeEditedTask = (e, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: e,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <DateTime />
      <h4>Hey {props.currentUser.displayName} what do you want to do today</h4>
      <TodoForm addTodo={addTodo} />
      <Todo
        removeTodo={removeTodo}
        todos={todos}
        toggleCompleted={toggleCompleted}
        toggleEdit={toggleEdit}
        changeEditedTask={changeEditedTask}
      />
    </div>
  );
};

export default TodoContainer;
