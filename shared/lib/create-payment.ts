import axios from "axios";
interface OrderDetails {
    amount: number;
    currency: string;
}
export async function createPayment(details: OrderDetails) {
    const { data } = await axios.post<any>("https://www.mockcard.io/api/v1/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    brand: "visa",
    scenario: "success",
    amount: details.amount,
    currency: details.currency,
    webhook_url: process.env.PAYMENT_CALLBACK_URL,
  }),
});

return data;
}