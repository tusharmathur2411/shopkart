import { SERVER_URL } from "../constants/AppConstants";

const createOrderService = (order) =>
  fetch(`${SERVER_URL}/orders`, {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(order)
}).then((res) => (res.status === 204 ? null : res.json()));

export default createOrderService;