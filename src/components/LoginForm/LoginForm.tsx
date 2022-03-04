import { LoginFormLogic } from './LoginFormLogic';

interface Props {
  login: (username: string, password: string) => Promise<void>
}

export const LoginForm = ({ login }: Props) => {
  const { formData, updateFormData, handleLogin, error } = LoginFormLogic({ login });

  return (
    <div className='loginform'>
      <form onSubmit={handleLogin}>
        <input className={`${error && 'error'}`} placeholder='Username' name='username' value={formData.username} onChange={updateFormData} required />
        <input className={`${error && 'error'}`} type='password' placeholder='Password' name='password' value={formData.password} onChange={updateFormData} required />
        <button className='confirm'>Login</button>
      </form>
      {
        error === 403 &&
        <div className='error'>Invalid username or password</div>
      }
    </div>
  )
}