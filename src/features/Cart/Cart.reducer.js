
const reducer = (state = {}, action) => {
    switch (action.type) {
      case "LOAD_CART":
        return action.cart;
      case "LOGOUT":
        return JSON.parse(localStorage.getItem("cart"));
      default:
        return state;
    }
}

export default reducer;