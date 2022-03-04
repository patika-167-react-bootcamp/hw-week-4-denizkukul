import { useState } from 'react';
import { category, categoryInput } from '../../interfaces';
import { StateController } from '../../app/AppLogic';


interface Args {
  category: category;
  deleteCategory: (id: number) => void;
}

export const CategoryLogic = ({ category, deleteCategory }: Args) => {
  // Initiates this component with passed values
  // Changes to this category will trigger render only for this component (todos are not visible on this page)
  // If this todos properties needs to be changed from another component while this one is visible, state needs to be moved to parent component
  const [categoryValues, setCategoryValues] = useState(category);
  const [editing, setEditing] = useState(false);
  const handleDeleteCategory = () => {
    deleteCategory(categoryValues.id);
  }
  const startEdit = () => {
    setEditing(true);
  }
  const saveEdit = (newCategory: categoryInput) => {
    StateController.editCategory(newCategory, categoryValues.id).then(() => {
      const newState = StateController.categories.get(categoryValues.id);
      newState && setCategoryValues(newState);
      setEditing(false);
    })
  }
  const cancelEdit = () => {
    setEditing(false);
  }

  return { categoryValues, handleDeleteCategory, editing, startEdit, saveEdit, cancelEdit }
}