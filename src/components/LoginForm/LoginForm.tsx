import { LoginFormLogic } from './LoginFormLogic';

interface Props {
  login: (username: string, password: string) => void;
}

export const LoginForm = ({ login }: Props) => {
  const { formData, updateFormData, handleLogin } = LoginFormLogic(login);

  return (
    <div className='loginform'>
      <form onSubmit={handleLogin}>
        <input placeholder='Username' name='username' value={formData.username} onChange={updateFormData} />
        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={updateFormData} />
        <button className='confirm'>Login</button>
      </form>
    </div>
  )
}