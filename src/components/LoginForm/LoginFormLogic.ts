import { useState } from "react";

interface Args {
  login: (username: string, password: string) => Promise<void>
}

export const LoginFormLogic = ({ login }: Args) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<number | null>(null);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null);
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.username, formData.password)
      .catch(error => { console.log(error); setError(error.response.status) })
  }
  return { formData, updateFormData, handleLogin, error }
}