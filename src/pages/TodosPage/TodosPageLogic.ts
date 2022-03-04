import { StateController } from "../../app/AppLogic";
import { useState } from "react";
import { todoInput } from "../../interfaces";

export const TodosPageLogic = () => {
  // Changes in todo properties will be rendered by todo component
  // Apart from filter changes, TodosPage needs to render only if todo added or deleted, so checking todo count is enough
  const [todoCount, setTodoCount] = useState(StateController.todos.size);
  const [filter, setFilter] = useState({ title: '', categoryId: 0, statusId: 0 });

  const addTodo = (newTodo: todoInput) => {
    StateController.addTodo(newTodo)
      .then(() => setTodoCount(StateController.todos.size));
  }

  const deleteTodo = (id: number) => {
    StateController.deleteTodo(id);
    setTodoCount(StateController.todos.size);
  }

  const filteredTodos = () => {
    if (Object.values(filter).every(value => value === '' || value === 0)) {
      return [...StateController.todos.values()];
    }
    else return [...StateController.todos.values()].filter(todo => {
      return todo.title.includes(filter.title) &&
        (filter.categoryId === 0 || todo.categoryId === filter.categoryId) &&
        (filter.statusId === 0 || todo.statusId === filter.statusId)
    })
  }

  return { addTodo, deleteTodo, filteredTodos, filter, setFilter }
}