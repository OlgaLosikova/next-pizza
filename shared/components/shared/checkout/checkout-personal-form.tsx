'use client'
import WhiteBlock from '../white-block';
import FormInput from '../form-components/form-input';


const CheckoutPersonalForm:React.FC = () => {
  return (
                <WhiteBlock title="2. Персональные данные">
                    <div className="grid grid-cols-2 gap-5">
                        <FormInput name='firstName' required={true} className="text-base" placeholder="Имя" />
                        <FormInput  name='lastName' className="text-base" placeholder="Фамилия" required={true}/>
                        <FormInput  name='email' className="text-base" placeholder="Email" required={true} />
                        <FormInput  name='phone' className="text-base" placeholder="Телефон" required={true}/>
                    </div>
                </WhiteBlock>

  )
}
export default CheckoutPersonalForm