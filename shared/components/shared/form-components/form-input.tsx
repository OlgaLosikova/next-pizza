'use client'
import React from 'react'
import RequiredSymbol from './required-symbol';
import ErrorText from './error-text';
import ClearButton from './clear-button';
import { useFormContext, useFormState, useWatch, get } from 'react-hook-form';
import { Input } from '../../ui/input';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
name:string;
label?:string;
required?:boolean;
className?:string
}

const FormInput: React.FC<Props> = ({name, className,required,label, ...props}) => {
    const {register, setValue, control}=useFormContext();
    const value=useWatch({name, control});
    const onClickClear=()=>setValue(name, '', {shouldValidate:true})
const {errors}=useFormState({control})
 const errorText = get(errors, name)?.message?.toString();
    return (
        <div className={className}>
            {label&&(
                <p>
                    {label} {required&&<RequiredSymbol/>}
                </p>
            )}
            <div className="relative">
                <Input  className='h-12 text-md' {...register(name)} {...props}/>
                {value&&<ClearButton onClick={onClickClear}/>}
            </div>
            {errorText&&<ErrorText text={errorText}/>}
            
        </div>
    )
}
export default FormInput