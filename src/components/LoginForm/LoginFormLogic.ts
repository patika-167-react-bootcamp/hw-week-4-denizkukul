import { useState } from "react";

export const LoginFormLogic = (login: (username: string, password: string) => void) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.username, formData.password);
  }
  return { formData, updateFormData, handleLogin }
}