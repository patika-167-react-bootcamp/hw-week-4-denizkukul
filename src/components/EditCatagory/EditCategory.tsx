import { category, categoryInput } from '../../interfaces';
import { EditCategoryLogic } from './EditCategoryLogic';
import { ColorSelect } from '..';

interface Props {
  saveEdit: (newCategory: categoryInput) => void;
  cancelEdit: () => void;
  categoryValues: category;
}

export const EditCategory = ({ saveEdit, cancelEdit, categoryValues }: Props) => {
  const { formData, setCategoryTitle, setStatusTitle, setStatusColor, addStatusInput, removeStatusInput, handleSaveEdit } = EditCategoryLogic({ saveEdit, categoryValues });

  return (
    <div className='editcategory'>
      <form onSubmit={handleSaveEdit}>
        <input className='title' placeholder='Category Title' name='title' value={formData.title} onChange={setCategoryTitle} required />
        {
          formData.statuses.map((status, i) => {
            return (
              <div className='status' key={i}>
                <input placeholder={`Status ${i + 1}`} name={'' + i} value={status.title} onChange={(e) => { setStatusTitle(e, i) }} required />
                <ColorSelect value={formData.statuses[i].color} options={['blue', 'red', 'green', 'orange', 'purple']} index={i} label='Status Color' onChange={setStatusColor} />
                {
                  i !== 0 && // Category must have at least 1 status
                  <button type='button' className='danger remove' onClick={() => { removeStatusInput(i) }}>Remove</button>
                }
              </div>
            )
          })
        }
        <div className='buttons'>
          <button type='button' onClick={addStatusInput} className='confirm newstatus'>New Status</button>
          <button type='submit' className='confirm save'>Save</button>
          <button type='button' onClick={cancelEdit} className='danger cancel'>Cancel</button>
        </div>
      </form>
    </div>
  )
}