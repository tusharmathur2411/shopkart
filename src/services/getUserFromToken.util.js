import { SERVER_URL } from "../constants/AppConstants";

export default () =>
  fetch(`${SERVER_URL}/auth/user`, {
    credentials: "include"
  }).then((res) => (res.status === 204 ? null : res.json()));
