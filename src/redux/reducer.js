import { combineReducers } from "redux";
import user from "../features/AuthPage/Auth.reducer";

function orders(state = [], action) {
  switch (action.type) {
    case "LOAD_ORDERS":
      return action.orders;
    case "LOGOUT":
      return [];
    default:
      return state;
  }
}

function cartLoading(state = false, action) {
  switch (action.type) {
    case "CART_LOADING":
      return true;
    case "LOAD_CART":
      return false;
    default:
      return state;
  }
}

function products(state = [], action) {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return action.products;
    default:
      return state;
  }
}

function cart(state = [], action) {
  switch (action.type) {
    case "LOAD_CART":
      return action.cart;
    case "LOGOUT":
      return JSON.parse(localStorage.getItem("cart"));
    default:
      return state;
  }
}

export default combineReducers({ cartLoading, user, products, cart, orders });
