import getUserFromToken from "../../services/getUserFromToken.service";
import {
  loadCartForUser,
  loadCartData,
} from "../Cart/Cart.actions"
import { loadOrdersForUser } from "../Orders/Orders.actions";
import { SERVER_URL } from "../../constants/AppConstants";

export const fetchUser = () => {
  return (dispatch) => {
    getUserFromToken().then((res) => {
      dispatch(logIn(res));
      if (res) {
        dispatch(loadCartForUser());
        dispatch(loadOrdersForUser());
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
