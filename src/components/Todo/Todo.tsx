import './Todo.css';
import { todo } from '../../interfaces';
import { StateController } from '../../app/AppLogic';
import { EditTodo } from '..';
import { TodoLogic } from './TodoLogic';

interface Props {
  todo: todo;
  deleteTodo: (id: number) => void;
}

export const Todo = ({ todo, deleteTodo }: Props) => {
  const { todoValues, handleDeleteTodo, editing, startEdit, saveEdit, cancelEdit } = TodoLogic({ todo, deleteTodo });

  return (
    <>
      {
        editing ?
          <EditTodo cancelEdit={cancelEdit} saveEdit={saveEdit} todoValues={todoValues} /> :
          <div className={`todo ${StateController.statuses.get(todoValues?.statusId)?.color}`}>
            <div className='todo-title'>{todoValues?.title}</div>
            <div className='todo-category'>{StateController.categories.get(todoValues.categoryId)?.title}</div>
            <div className='todo-status'>{StateController.statuses.get(todoValues?.statusId)?.title}</div>
            <button onClick={startEdit} className='edit confirm'>Edit</button>
            <button onClick={handleDeleteTodo} className='delete danger'>Delete</button>
          </div>
      }
    </>
  )
}