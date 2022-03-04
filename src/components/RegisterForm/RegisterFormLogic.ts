import { useState } from 'react';

interface Args {
  register: (username: string, password: string, passwordConfirm: string) => Promise<void>;
}

export const RegisterFormLogic = ({ register }: Args) => {
  const [formData, setFormData] = useState({ username: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState<number | null>(null);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null);
  }
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData.username, formData.password, formData.passwordConfirm)
      .catch(error => setError(error.response.status))
  }
  return { formData, updateFormData, handleRegister, error }
}