import { RegisterFormLogic } from './RegisterFormLogic';

interface Props {
  register: (username: string, password: string, passwordConfirm: string) => void;
}

export const RegisterForm = ({ register }: Props) => {
  const { formData, updateFormData, handleRegister } = RegisterFormLogic(register);

  return (
    <div className='registerform'>
      <form onSubmit={handleRegister}>
        <input placeholder='Username' name='username' value={formData.username} onChange={updateFormData} />
        <input type='password' placeholder='Password' name='password' value={formData.password} onChange={updateFormData} />
        <input type='password' placeholder='Confirm Password' name='passwordConfirm' value={formData.passwordConfirm} onChange={updateFormData} />
        <button className='confirm'>Register</button>
      </form>
    </div>
  )
}