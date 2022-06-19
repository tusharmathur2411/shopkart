
const reducer = (state = [], action) => {
    switch (action.type) {
      case "LOAD_ORDERS":
        return action.orders;
      case "ORDER_PLACED":
        return [...state, action.newOrder]
      case "UPDATE_ORDERS": 
        return state.map(order => order._id===action.orderId ? action.newOrder : order);
      case "LOGOUT":
        return [];
      default:
        return state;
    }
}

export default reducer;