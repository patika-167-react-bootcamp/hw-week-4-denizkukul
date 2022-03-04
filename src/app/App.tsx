import React from 'react';
import { NavBar } from '../components';
import { TodosPage, CategoriesPage, AuthPage, Loading } from '../pages';
import { AppLogic } from './AppLogic';
import './App.css';

const App: React.FC = () => {
  const { page, loggedIn, loading, setPage, login, register, logout } = AppLogic();
  return (
    <div className='App'>
      {(!loggedIn && !loading) && <AuthPage login={login} register={register} />}
      {loading && <Loading />}
      {
        (loggedIn && !loading) &&
        <>
          <NavBar page={page} setPage={setPage} logout={logout} />
          {page === 'todos' && <TodosPage />}
          {page === 'categories' && <CategoriesPage />}
        </>
      }
    </div>
  );
}

export default App;
