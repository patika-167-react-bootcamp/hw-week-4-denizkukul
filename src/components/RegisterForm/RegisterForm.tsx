import { RegisterFormLogic } from './RegisterFormLogic';

interface Props {
  register: (username: string, password: string, passwordConfirm: string) => Promise<void>;
}

export const RegisterForm = ({ register }: Props) => {
  const { formData, updateFormData, handleRegister, error } = RegisterFormLogic({ register });

  return (
    <div className='registerform'>
      <form onSubmit={handleRegister}>
        <input className={`${error === 401 && 'error'}`} placeholder='Username' name='username' value={formData.username} onChange={updateFormData} required />
        <input className={`${error === 400 && 'error'}`} type='password' placeholder='Password' name='password' value={formData.password} onChange={updateFormData} required />
        <input className={`${error === 400 && 'error'}`} type='password' placeholder='Confirm Password' name='passwordConfirm' value={formData.passwordConfirm} onChange={updateFormData} required />
        <button className='confirm'>Register</button>
      </form>
      {
        error === 401 &&
        <div className='error'>Username is in use</div>
      }
      {
        error === 400 &&
        <div className='error'>Passwords do not match</div>
      }
    </div>
  )
}