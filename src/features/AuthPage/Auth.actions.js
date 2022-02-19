import getUserFromToken from "../../services/getUserFromToken.util";
import {
  loadCartForUser,
  loadOrdersForUser,
  loadCartData
} from "../../redux/actions/cartactions";
import { SERVER_URL } from "../../constants/AppConstants";

export const fetchUser = () => {
  return (dispatch) => {
    getUserFromToken().then((res) => {
      dispatch(logIn(res));
      if (res) {
        dispatch(loadCartForUser(res.id));
        dispatch(loadOrdersForUser(res.id));
      } else {
        dispatch(loadCartData(JSON.parse(localStorage.getItem("cart")) || []));
      }
    });
  };
};

export const logIn = (user) => {
  return {
    type: "LOGIN",
    user
  };
};

export const logOut = () => {
  return (dispatch) => {
    fetch(`${SERVER_URL}/auth/logout`, {
      credentials: "include"
    }).then((res) =>
      dispatch({
        type: "LOGOUT"
      })
    );
  };
};
