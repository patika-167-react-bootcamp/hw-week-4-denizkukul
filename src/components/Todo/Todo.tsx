import './Todo.css';
import { useEffect, useState } from 'react';
import { todo, todoInput } from '../../interfaces';
import { StateController } from '../../app/AppLogic';
import { EditTodo } from '..';

interface Props {
  todo: todo;
  deleteTodo: (id: number) => void;
}

export const Todo = ({ todo, deleteTodo }: Props) => {
  // Initiates this component with passed values
  // Changes to this todo will trigger render only for this component
  // If this todos properties needs to be changed from another component while this one is visible, state needs to be moved to parent component
  const [todoValues, setTodoValues] = useState(todo)
  const [editing, setEditing] = useState(false);
  // TODO: Add edit function for todos using setTodoValues //
  const handleDeleteTodo = () => {
    deleteTodo(todoValues.id);
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
  return (
    <>
      {
        editing ?
          <EditTodo cancelEdit={cancelEdit} saveEdit={saveEdit} todoValues={todoValues} /> :
          <div className={`todo ${StateController.statuses.get(todoValues?.statusId)?.color}`}>
            <div className='todo-title'>{todoValues?.title}</div>
            <div className='todo-category'>{StateController.categories.get(todoValues.categoryId)?.title}</div>
            <div className='todo-status'>{StateController.statuses.get(todoValues?.statusId)?.title}</div>
            <button onClick={() => { setEditing(true) }} className='edit confirm'>Edit</button>
            <button onClick={handleDeleteTodo} className='delete danger'>Delete</button>
          </div>
      }
    </>
  )
}