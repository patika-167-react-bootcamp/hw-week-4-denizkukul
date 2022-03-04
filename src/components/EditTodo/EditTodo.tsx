import { Select } from '..';
import { EditTodoLogic } from './EditTodoLogic';
import { StateController } from '../../app/AppLogic';
import { todo, todoInput } from '../../interfaces';

interface Props {
  saveEdit: (newTodo: todoInput) => void;
  cancelEdit: () => void;
  todoValues: todo;
}

export const EditTodo = ({ saveEdit, cancelEdit, todoValues }: Props) => {
  const { formData, setTodoTitle, setCategory, setStatus, handleSaveEdit, } = EditTodoLogic({ saveEdit, todoValues });
  return (
    <form onSubmit={handleSaveEdit}>
      <div className={`todo edit ${StateController.statuses.get(todoValues.statusId)?.color}`}>
        <input placeholder='Todo Title' value={formData.title} onChange={(e) => setTodoTitle(e.target.value)} />
        <Select options={[...StateController.categories.entries()]} label={'Category'} value={formData.categoryId} onChange={setCategory} />
        <Select options={[...StateController.statuses.entries()].filter(item => item[1].categoryId === formData.categoryId)} label={'Status'} value={formData.statusId} onChange={setStatus} />
        <button type='submit' className='save confirm'>Save</button>
        <button type='button' onClick={cancelEdit} className='cancel danger'>Cancel</button>
      </div>
    </form>
  )
}