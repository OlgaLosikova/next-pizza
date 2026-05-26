'use client'
import React from 'react'
import RequiredSymbol from './required-symbol';

import ErrorText from './error-text';
import ClearButton from './clear-button';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
name:string;
label?:string;
required?:boolean;
className?:string
}

const FormInput: React.FC<Props> = ({name, className,required,label, ...props}) => {
    const {register, formState:{errors}, watch,setValue}=useFormContext();
    const value=watch(name);
    const errorText=errors[name]?.message as string;
    const onClickClear=()=>setValue(name, '', {shouldValidate:true})
    console.log(name, value)
    return (
        <div className={className}>
            {label&&(
                <p>
                    {label} {required&&<RequiredSymbol/>}
                </p>
            )}
            <div className="relative">
                <Input onInput={(e) => setValue(name, e.currentTarget.value, { shouldValidate: true })} className='h-12 text-md' {...register(name)} {...props}/>
                {value&&<ClearButton onClick={onClickClear}/>}
            </div>
            {errorText&&<ErrorText text='Поле обязательно для заполнения'/>}
            
        </div>
    )
}
export default FormInput