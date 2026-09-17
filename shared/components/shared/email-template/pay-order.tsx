import React from 'react'

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

const PayOrderEmailTemplate: React.FC<EmailTemplateProps> =({ orderId, totalAmount, paymentUrl }) => {
  return (
    <div>
      <h1>Заказ, #{orderId}!</h1>
      <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдите <a href={paymentUrl} target="_blank" rel="noopener noreferrer">по этой ссылке</a> для оплаты.</p>
    </div>
  )
}
export default PayOrderEmailTemplate