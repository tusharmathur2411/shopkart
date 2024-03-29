import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { LOGO_URL } from "../../constants/AppConstants";
import cartIcon from "../../assets/cartIcon.svg";
import { Typography } from "@mui/material";
import Loader from "../Loader";
import * as CartActions from "../../features/Cart/Cart.actions";
import * as AuthActions from "../../features/AuthPage/Auth.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Topbar = (props) => {
  const { user, cart, orders, cartLoading, logOut } = props;

  return (
    <div className="navbar">
      <div className="dropper">
        <Typography variant="body1">
          {`Hi ${user ? user.name : "Guest"}`}
        </Typography>
        <div className="nav-dropdown">
          <Link
            className="navlink"
            to={`/signin${user ? "?logout=true" : ""}`}
            onClick={() => user && logOut()}
          >
            {user ? "Sign Out" : "Sign In"}
          </Link>
        </div>
      </div>
      <Link className="nav-logo" to="/">
        <img width="100%" className="logo" src={LOGO_URL} alt="logo" />
      </Link>
      {orders && Object.keys(orders).length > 0 ? (
        <Link className="link" to="/orders">
          <b>Orders</b>
        </Link>
      ) : (
        ""
      )}
      <div className="nav-cart-link">
        {cartLoading ? <Loader /> : ""}
        <Link to="/cart">
          <img className="cart-icon" src={cartIcon} alt="carticon" />
          <span id="cart-count">
            {Object.values(cart)?.reduce((a, c) => a + c, 0) || ""}
          </span>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  orders: state.orders,
  cartLoading: state.cartLoading
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions, ...AuthActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);