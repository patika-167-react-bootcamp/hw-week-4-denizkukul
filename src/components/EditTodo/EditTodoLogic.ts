import { useState } from "react";
import { todo, todoInput } from "../../interfaces";

interface Args {
  saveEdit: (newTodo: todoInput) => void;
  todoValues: todo;
}

export const EditTodoLogic = ({ saveEdit, todoValues }: Args) => {
  const [formData, setFormData] = useState({ title: todoValues.title, categoryId: todoValues.categoryId, statusId: todoValues.statusId });

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
  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEdit(formData);
  }
  return { formData, setTodoTitle, setCategory, setStatus, handleSaveEdit }
}