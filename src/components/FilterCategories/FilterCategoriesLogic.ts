import { useState } from "react";

interface Args {
  filter: {
    title: string;
  }
  setFilter: React.Dispatch<React.SetStateAction<{
    title: string;
  }>>
}

export const FilterCategoriesLogic = ({ filter, setFilter }: Args) => {
  const [expanded, setExpanded] = useState(false);

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }
  const clearFilter = () => {
    setFilter({ title: '' })
  }
  const toggleExpand = () => {
    setExpanded(current => !current);
  }

  return { updateFilter, clearFilter, expanded, toggleExpand }
}