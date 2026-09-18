import React from 'react'
import { useForm } from 'react-hook-form';
interface Props{
    onClose?:VoidFunction;
}
export const LoginForm = () => {
    const form=useForm({
        defaultValues:{
            email:'',
            password:''
        }
    })
  return (
    <div>login-form</div>
  )
}
export default LoginForm