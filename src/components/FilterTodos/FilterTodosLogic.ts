import { useState } from "react";

interface Args {
  filter: {
    title: string;
    categoryId: number;
    statusId: number;
  }
  setFilter: React.Dispatch<React.SetStateAction<{
    title: string;
    categoryId: number;
    statusId: number;
  }>>
}

export const FilterTodosLogic = ({ filter, setFilter }: Args) => {
  const [expanded, setExpanded] = useState(false);

  // TODO: Fix Typescript error when merging these into a single formupdate function
  const setTitle = (newValue: string) => {
    setFilter((current) => { return { ...current, title: newValue } })
  }
  const setCategory = (newValue: number) => {
    setFilter((current) => { return { ...current, categoryId: newValue } })
  }
  const setStatus = (newValue: number) => {
    setFilter((current) => { return { ...current, statusId: newValue } })
  }

  const clearFilter = () => {
    setFilter({ title: '', categoryId: 0, statusId: 0 })
  }

  const toggleExpand = () => {
    setExpanded(current => !current);
  }

  return { setTitle, setCategory, setStatus, clearFilter, expanded, toggleExpand }
}