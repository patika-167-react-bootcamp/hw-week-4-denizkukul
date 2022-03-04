import './Category.css';
import { useState } from 'react';
import { category } from '../../interfaces';
import { StateController } from '../../app/AppLogic';

interface Props {
  category: category;
  deleteCategory: (categoryID: number) => void;
}

export const Category = ({ category, deleteCategory }: Props) => {
  // Initiates this component with passed values
  // Changes to this category will trigger render only for this component (todos are not visible on this page)
  // If this todos properties needs to be changed from another component while this one is visible, state needs to be moved to parent component
  const [categoryValues, setCategoryValues] = useState(category);
  // const [editing, setEditing] = useState(false);
  // TODO: Add edit function for categories using setCategoryValues //
  const handleDeleteCategory = () => {
    deleteCategory(categoryValues.id);
  }
  return (
    <>
      {
        <div className='category'>
          <div className='title'>{categoryValues?.title}</div>
          <button className='edit confirm'>Edit</button>
          <button onClick={handleDeleteCategory} className='delete danger'>Delete</button>
        </div>
      }
    </>
  )
}