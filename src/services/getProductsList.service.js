import { SERVER_URL } from "../constants/AppConstants";

const getProductsList =  () =>
  fetch(`${SERVER_URL}/products`)
    .then((res) => (res.status === 204 ? null : res.json()));

export default getProductsList;