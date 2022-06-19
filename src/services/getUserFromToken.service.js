import { SERVER_URL } from "../constants/AppConstants";

const getUserFromToken = () =>
  fetch(`${SERVER_URL}/auth/user`, {
    credentials: "include"
  }).then((res) => (res.status === 204 ? null : res.json()));

export default getUserFromToken;