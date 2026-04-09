import { cn } from '@/shared/lib/utils';

interface Props {
  value: number;
  className?: string;
}

const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
export default CartItemDetailsPrice