interface Props {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

export const NavBar = ({ page, setPage, logout }: Props) => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='title'>TodoApp</div>
        <button className={`navbutton ${page === 'todos' ? 'current' : ''}`} onClick={() => { setPage('todos') }}>Todolist</button>
        <button className={`navbutton ${page === 'categories' ? 'current' : ''}`} onClick={() => { setPage('categories') }}>Categories</button>
        <button className='navbutton logout' onClick={logout}>Log Out</button>
      </div>
    </div>
  )
}