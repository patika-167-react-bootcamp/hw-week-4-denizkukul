import { Select, ExpandIcon } from '..';
import { FilterTodosLogic } from './FilterTodosLogic';
import { StateController } from '../../app/AppLogic';
import './FilterTodos.css';

interface Props {
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

export const FilterTodos = ({ filter, setFilter }: Props) => {
  const { setTitle, setCategory, setStatus, clearFilter, expanded, toggleExpand } = FilterTodosLogic({ filter, setFilter });

  return (
    <div className="filtertodos">
      <div className={`head ${expanded && 'expanded'}`} onClick={toggleExpand}>Filter Todos<ExpandIcon expanded={expanded} /></div>
      {
        expanded &&
        <div className='body'>
          <input placeholder='Todo Title' name='title' value={filter.title} onChange={(e) => { setTitle(e.target.value) }} />
          <Select options={[...StateController.categories.entries()]} label={'Category'} value={filter.categoryId} onChange={setCategory} />
          <Select options={[...StateController.statuses.entries()].filter(item => item[1].categoryId === filter.categoryId)} label={'Status'} value={filter.statusId} onChange={setStatus} />
          <button className='confirm' onClick={clearFilter} >Clear</button>
        </div>
      }
    </div>
  )
}