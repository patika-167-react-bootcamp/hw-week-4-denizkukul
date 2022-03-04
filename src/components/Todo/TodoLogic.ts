import { useState } from 'react';
import { todo, todoInput } from '../../interfaces';
import { StateController } from '../../app/AppLogic';


interface Args {
  todo: todo;
  deleteTodo: (id: number) => void;
}

export const TodoLogic = ({ todo, deleteTodo }: Args) => {
  // Initiates this component with passed values
  // Changes to this todo will trigger render only for this component
  // If this todos properties needs to be changed from another component while this one is visible, state needs to be moved to parent component
  const [todoValues, setTodoValues] = useState(todo)
  const [editing, setEditing] = useState(false);
  const handleDeleteTodo = () => {
    deleteTodo(todoValues.id);
  }
  const startEdit = () => {
    setEditing(true);
  }
  const saveEdit = (newTodo: todoInput) => {
    StateController.editTodo(newTodo, todoValues.id);
    const newState = StateController.todos.get(todoValues.id);
    newState && setTodoValues(newState);
    setEditing(false);
  }
  const cancelEdit = () => {
    setEditing(false);
  }

  return { todoValues, handleDeleteTodo, editing, startEdit, saveEdit, cancelEdit }
}