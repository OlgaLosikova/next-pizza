import z from "zod";
export const passwordSchema=z.string().min(4, {message:'Пароль должен содержать не менее 4 символов'})
export const formLoginSchema=z.object({
    email:z.string().email({message:'Введите клрректную почту'}),
    password:passwordSchema
})

export const formRegisterSchema=formLoginSchema.merge(
z.object({
    fullName:z.string().min(2,{message:'Введите имя и фамилию'}),

})
)