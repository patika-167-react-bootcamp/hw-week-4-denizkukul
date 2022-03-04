import { FilterCategoriesLogic } from './FilterCategoriesLogic';
import { ExpandIcon } from '..';
import './FilterCategories.css';

interface Props {
  filter: {
    title: string;
  }
  setFilter: React.Dispatch<React.SetStateAction<{
    title: string;
  }>>
}

export const FilterCategories = ({ filter, setFilter }: Props) => {
  const { updateFilter, clearFilter, expanded, toggleExpand } = FilterCategoriesLogic({ filter, setFilter });
  return (
    <div className="filtercategories">
      <div className={`head ${expanded && 'expanded'}`} onClick={toggleExpand}>Filter Categories<ExpandIcon expanded={expanded} /></div>
      {
        expanded &&
        <div className='body'>
          <input placeholder='Category Title' name='title' value={filter.title} onChange={updateFilter} />
          <button onClick={clearFilter} className='confirm'>Clear</button>
        </div>
      }
    </div>
  )
}