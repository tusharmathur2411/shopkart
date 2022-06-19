import { SERVER_URL } from "../constants/AppConstants";

const getOrdersService =  () =>
  fetch(`${SERVER_URL}/orders`, {
    credentials: "include"
}).then((res) => (res.status === 204 ? null : res.json()));

export default getOrdersService;