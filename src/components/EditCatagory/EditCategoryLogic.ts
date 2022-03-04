import { useState } from "react";
import { StateController } from "../../app/AppLogic";
import { category, categoryInput, statusInput } from "../../interfaces";

interface Args {
  saveEdit: (newCategory: categoryInput) => void;
  categoryValues: category;
}

export const EditCategoryLogic = ({ saveEdit, categoryValues }: Args) => {
  let statuses: statusInput[] = [];
  categoryValues.statuses.forEach(id => {
    let status = StateController.statuses.get(id);
    status && statuses.push({ title: status.title, color: status.color })
  });

  const [formData, setFormData] = useState<categoryInput>({ title: categoryValues.title, statuses: statuses });

  // TODO: Fix Typescript error when merging these into a single formupdate function
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

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEdit(formData);
  }
  return { formData, setCategoryTitle, setStatusTitle, setStatusColor, addStatusInput, removeStatusInput, handleSaveEdit }
}