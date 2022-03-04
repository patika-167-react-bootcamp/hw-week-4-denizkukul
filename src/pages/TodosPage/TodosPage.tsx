import './TodosPage.css';
import { Todo, AddTodo, FilterTodos } from '../../components';
import { TodosPageLogic } from './TodosPageLogic';

export const TodosPage = () => {
  const { addTodo, deleteTodo, filteredTodos, filter, setFilter } = TodosPageLogic();
  return (
    <div className="todospage">
      <div className="container">
        <AddTodo addTodo={addTodo} />
        <FilterTodos filter={filter} setFilter={setFilter} />
        <div className='list-head'>Todo List</div>
        <div className='todo-list'>
          {
            filteredTodos().map(todo => {
              return (<Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />)
            })
          }
        </div>
      </div>
    </div>
  )
}