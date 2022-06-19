import { SERVER_URL } from "../constants/AppConstants";

const getCartForUser =  () =>
  fetch(`${SERVER_URL}/carts`, {
    credentials: "include"
}).then((res) => (res.status === 204 ? null : res.json()));

export default getCartForUser;