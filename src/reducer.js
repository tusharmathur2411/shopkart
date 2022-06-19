import { combineReducers } from "redux";
import user from "./features/AuthPage/Auth.reducer";
import cart from "./features/Cart/Cart.reducer";
import orders from "./features/Orders/Orders.reducer.js";

function cartLoading(state = false, action) {
  switch (action.type) {
    case "CART_LOADING":
      return true;
    case "LOAD_PRODUCTS":
      return false;
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

export default combineReducers({ cartLoading, user, products, cart, orders });
