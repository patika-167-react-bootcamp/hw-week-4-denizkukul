import { useState } from 'react';
import { categoryInput } from '../../interfaces';

export const AddCategoryLogic = (addCategory: (newCategory: categoryInput) => void) => {
  const [formData, setFormData] = useState<categoryInput>({ title: '', statuses: [{ title: '', color: '' }] });
  const [expanded, setExpanded] = useState(false);

  const setCategoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousState) => { return { ...previousState, title: e.target.value } })
  }
  const setStatusTitle = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    let newStatuses = formData.statuses.slice();
    newStatuses[i].title = e.target.value;
    setFormData((previousState) => { return { ...previousState, statuses: newStatuses } })
  }

  const setStatusColor = (newValue: string, i: number) => {
    let newStatuses = formData.statuses.slice();
    newStatuses[i].color = newValue;
    setFormData((previousState) => { return { ...previousState, statuses: newStatuses } })
  }

  const addStatusInput = () => {
    let newStatuses = formData.statuses.slice();
    newStatuses.push({ title: '', color: '' })
    setFormData((current) => { return { ...current, statuses: newStatuses } })
  }

  const removeStatusInput = (index: number) => {
    let newStatuses = formData.statuses.slice();
    newStatuses.splice(index, 1)
    setFormData((current) => { return { ...current, statuses: newStatuses } })
  }

  const toggleExpand = () => {
    setExpanded(current => !current);
  }

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory(formData);
    setFormData({ title: '', statuses: [{ title: '', color: '' }] });
  }

  return { formData, setCategoryTitle, setStatusTitle, setStatusColor, addStatusInput, removeStatusInput, handleAddCategory, expanded, toggleExpand }
}