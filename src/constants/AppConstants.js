export const SERVER_URL = process.env.REACT_APP_SERVER_URL.split("/")
  .filter((p, i, a) => i !== a.length - 1 || a !== "")
  .join("/");
