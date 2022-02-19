export default (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
    case "UPDATE_NAME":
      return { ...state, displayName: action.updatedName };
    default:
      return state;
  }
};
