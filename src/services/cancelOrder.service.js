import { SERVER_URL } from "../constants/AppConstants";

const cancelOrderService = (orderId) =>
  fetch(`${SERVER_URL}/orders/${orderId}`, {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ status: "Cancelled" })
}).then((res) => (res.status === 204 ? null : res.json()));

export default cancelOrderService;