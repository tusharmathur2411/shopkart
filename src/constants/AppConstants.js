export const SERVER_URL = process.env.REACT_APP_SERVER_URL.split("/")
  .filter((p, i, a) => i !== a.length - 1 || a !== "")
  .join("/");

export const LOGO_URL =
  "https://rawcdn.githack.com/tusharmathur2411/shopkart/0801e9e1fa6a602043ff4b6a4d4d5f1544e1b8c1/src/logo.png";
