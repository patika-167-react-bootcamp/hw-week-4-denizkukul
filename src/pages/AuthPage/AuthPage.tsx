import './AuthPage.css';
import { LoginForm, RegisterForm } from '../../components';
import { useState } from 'react';

interface Props {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, passwordConfirm: string) => Promise<void>;
}

export const AuthPage = ({ login, register }: Props) => {
  const [tab, setTab] = useState('login');
  return (
    <div className='authpage'>
      <div className='container'>
        <div className='tabs'>
          <button className={`navbutton ${tab === 'login' ? 'current' : ''}`} onClick={() => { setTab('login') }}>Login</button>
          <button className={`navbutton ${tab === 'register' ? 'current' : ''}`} onClick={() => { setTab('register') }}>Register</button>
        </div>
        {tab === 'login' && <LoginForm login={login} />}
        {tab === 'register' && <RegisterForm register={register} />}
      </div>
    </div>
  )
}