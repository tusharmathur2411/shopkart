import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import "../styles/SignIn.css";
import axios from "axios";
import { SERVER_URL } from "../constants/AppConstants";

export default (props) => {
  const [redirectURL, setRedirectURL] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/google/url`, {
        withCredentials: true
      })
      // .then((res) => res.json())
      .then((res) => setRedirectURL(res.data));
  }, []);

  const handleSubmit = (e) => {
    const { startLogIn, loadCartForUser, loadOrdersForUser, history } = props;
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        startLogIn(auth.user);
        loadCartForUser(auth.user.id);
        loadOrdersForUser(auth.user.id);
        history.push(history.location.pathname.replace("/signin", "") || "/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="user-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button>Sign In</button>
      </form>
      <a href={redirectURL}>LOGIN WITH GOOGLE</a>
    </div>
  );
};
