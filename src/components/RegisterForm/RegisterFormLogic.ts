import { useState } from "react";


export const RegisterFormLogic = (register: (username: string, password: string, passwordConfirm: string) => void) => {
  const [formData, setFormData] = useState({ username: '', password: '', passwordConfirm: '' });
  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData.username, formData.password, formData.passwordConfirm);
  }
  return { formData, updateFormData, handleRegister }
}