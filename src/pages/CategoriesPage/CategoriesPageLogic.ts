import { StateController } from "../../app/AppLogic";
import { useState } from "react";
import { categoryInput } from "../../interfaces";

export const CategoriesPageLogic = () => {
  // Changes in category properties will be rendered by category component
  // Apart from filter changes, CategoriesPage needs to render only if category added or deleted, so checking category count is enough
  const [categoryCount, setCategoryCount] = useState(StateController.todos.size);
  const [filter, setFilter] = useState({ title: '' });

  const addCategory = (newCategory: categoryInput) => {
    StateController.addCategory(newCategory)
      .then(() => setCategoryCount(StateController.categories.size));
  }

  const deleteCategory = (id: number) => {
    StateController.deleteCategory(id);
    setCategoryCount(StateController.categories.size);
  }

  const filteredCategories = () => {
    if (filter.title !== '') {
      return [...StateController.categories.values()].filter(category => category.title.includes(filter.title))
    }
    else return [...StateController.categories.values()];
  }

  return { addCategory, deleteCategory, filteredCategories, filter, setFilter }
}