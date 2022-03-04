import { ExpandIcon, ColorSelect } from '..';
import { AddCategoryLogic } from './AddCategoryLogic';
import { categoryInput } from '../../interfaces';
import './AddCategory.css';

interface Props {
  addCategory: (newCategory: categoryInput) => void;
}

export const AddCategory = ({ addCategory }: Props) => {
  const { formData, setCategoryTitle, setStatusTitle, setStatusColor, addStatusInput, removeStatusInput, handleAddCategory, expanded, toggleExpand } = AddCategoryLogic(addCategory);

  // TODO: this component render function can be split into multiple components
  return (
    <div className='addcategory'>
      <div className={`head ${expanded && 'expanded'}`} onClick={toggleExpand}><p>Add Category</p><ExpandIcon expanded={expanded} /></div>
      {
        expanded &&
        <form onSubmit={handleAddCategory}>
          <input className='title' placeholder='Category Title' name='title' value={formData.title} onChange={setCategoryTitle} required />
          {
            formData.statuses.map((status, i) => {
              return (
                <div className='status' key={i}>
                  <input placeholder={`Status ${i + 1}`} name={"" + i} value={status.title} onChange={(e) => { setStatusTitle(e, i) }} required />
                  <ColorSelect value={formData.statuses[i].color} options={["blue", "red", "green", "orange", "purple"]} index={i} label='Status Color' onChange={setStatusColor} />
                  {
                    i !== 0 && // Category must have at least 1 status
                    <button className='danger' onClick={() => { removeStatusInput(i) }}>Remove</button>
                  }
                </div>
              )
            })
          }
          <div className="buttons">
            <button type='button' onClick={addStatusInput} className='confirm newstatus'>New Status</button>
            <button type='submit' className='confirm add'>Add</button>
          </div>
        </form>
      }
    </div>
  )
}