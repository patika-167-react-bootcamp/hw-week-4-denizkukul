import { Select, ExpandIcon } from '..';
import { AddTodoLogic } from './AddTodoLogic';
import { StateController } from '../../app/AppLogic';
import './AddTodo.css';

interface Props {
  addTodo: (newTodo: { title: string; categoryId: number; statusId: number; }) => void;
}

export const AddTodo = ({ addTodo }: Props) => {
  const { formData, setTodoTitle, setCategory, setStatus, handleAddTodo, expanded, toggleExpand } = AddTodoLogic({ addTodo });
  return (
    <div className='addtodo'>
      <div className={`head ${expanded && 'expanded'}`} onClick={toggleExpand}><p>Add Todo</p><ExpandIcon expanded={expanded} /></div>
      {
        expanded &&
        <form onSubmit={handleAddTodo}>
          <input placeholder='Todo Title' value={formData.title} onChange={(e) => setTodoTitle(e.target.value)} />
          <Select options={[...StateController.categories.entries()]} label={'Category'} value={formData.categoryId} onChange={setCategory} />
          <Select options={[...StateController.statuses.entries()].filter(item => item[1].categoryId === formData.categoryId)} label={'Status'} value={formData.statusId} onChange={setStatus} />
          <button className='confirm'>Add</button>
        </form>
      }
    </div>
  )
}