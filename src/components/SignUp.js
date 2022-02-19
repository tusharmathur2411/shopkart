import React, { Component } from "react";
import { auth } from "../firebase";
import "../styles/SignIn.css";

export default class SignUp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        auth.user.updateProfile({
          displayName: e.target.elements.name.value
        });
        this.props.history.push("/signin");
      })
      .catch((error) => alert(error.message));
  }

  render() {
    return (
      <div className="user-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Username" name="name" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" />
          <button>Create Account</button>
        </form>
      </div>
    );
  }
}
