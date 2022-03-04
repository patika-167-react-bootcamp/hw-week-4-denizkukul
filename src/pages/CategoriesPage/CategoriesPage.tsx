import './CategoriesPage.css';
import { Category, AddCategory, FilterCategories } from '../../components';
import { CategoriesPageLogic } from './CategoriesPageLogic';

export const CategoriesPage = () => {
  const { addCategory, deleteCategory, filteredCategories, filter, setFilter } = CategoriesPageLogic();
  return (
    <div className="categoriespage">
      <div className="container">
        <AddCategory addCategory={addCategory} />
        <FilterCategories filter={filter} setFilter={setFilter} />
        <div className='list-head'>Category List</div>
        <div className='category-list'>
          {
            filteredCategories().map((category) => {
              return (<Category key={category.id} category={category} deleteCategory={deleteCategory} />)
            })
          }
        </div>
      </div>
    </div>
  )
}