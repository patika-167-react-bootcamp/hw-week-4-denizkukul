import { useState } from "react";

interface Args {
  addTodo: (newTodo: { title: string; categoryId: number; statusId: number; }) => void
}

export const AddTodoLogic = ({ addTodo }: Args) => {
  const [formData, setFormData] = useState({ title: '', categoryId: 0, statusId: 0 });
  const [expanded, setExpanded] = useState(false);

  // TODO: Fix Typescript error when merging these into a single formupdate function
  const setTodoTitle = (newValue: string) => {
    setFormData((current) => { return { ...current, title: newValue } })
  }
  const setCategory = (newValue: number) => {
    setFormData((current) => { return { ...current, categoryId: newValue } })
  }
  const setStatus = (newValue: number) => {
    setFormData((current) => { return { ...current, statusId: newValue } })
  }
  const toggleExpand = () => {
    setExpanded(current => !current);
  }
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(formData);
    setFormData({ title: '', categoryId: 0, statusId: 0 })
  }
  return { formData, setTodoTitle, setCategory, setStatus, handleAddTodo, expanded, toggleExpand }
}