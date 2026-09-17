import WhiteBlock from '../white-block';
import { FormTextarea } from '../form-components/form-textarea';
import AddressInput from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorText from '../form-components/error-text';
import { cn } from '@/shared/lib/utils';
interface Props {
className?:string;
}

const CheckoutAddressForm:React.FC<Props> = ({className}) => {
  const {control}=useFormContext();
  return (
                                <WhiteBlock title="3. Адрес доставки">
                    <div className="flex flex-col gap-5">
                      <Controller
                      control={control}
                      name='address'
                      render={({field, fieldState})=><><AddressInput onChange={field.onChange} />
                    {fieldState.error?.message&&<ErrorText text={fieldState.error.message} />}</>}
                      />
                        <FormTextarea name='Комментарий' placeholder="Комментарий к заказу" className={cn("text-base", className)} rows={5} />
                    </div>
                </WhiteBlock>

  )
}
export default CheckoutAddressForm