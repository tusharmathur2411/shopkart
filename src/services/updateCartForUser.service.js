import { SERVER_URL } from "../constants/AppConstants";

const updateCartForUserService = (productList) =>
  fetch(`${SERVER_URL}/carts`, {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(productList)
}).then((res) => (res.status === 204 ? null : res.json()));

export default updateCartForUserService;