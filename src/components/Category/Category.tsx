import './Category.css';
import { category } from '../../interfaces';
import { CategoryLogic } from './CategoryLogic';
import { EditCategory } from '..';

interface Props {
  category: category;
  deleteCategory: (categoryID: number) => void;
}

export const Category = ({ category, deleteCategory }: Props) => {
  const { categoryValues, handleDeleteCategory, editing, startEdit, saveEdit, cancelEdit } = CategoryLogic({ category, deleteCategory });
  return (
    <>
      {
        editing ?
          <EditCategory categoryValues={categoryValues} saveEdit={saveEdit} cancelEdit={cancelEdit} /> :
          <div className='category'>
            <div className='title'>{categoryValues?.title}</div>
            <button onClick={startEdit} className='edit confirm'>Edit</button>
            <button onClick={handleDeleteCategory} className='delete danger'>Delete</button>
          </div>
      }
    </>
  )
}