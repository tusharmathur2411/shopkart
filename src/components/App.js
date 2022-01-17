import "../styles/App.css";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import * as cartactions from "../redux/actions/cartactions";
import * as useractions from "../redux/actions/useractions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routes from "../routes";

const App = (props) => {
  const {
    user,
    loadCartData,
    loadCartForUser,
    loadOrdersForUser,
    loadProducts
  } = props;

  useEffect(() => {
    if (user) {
      loadCartForUser(user.uid);
      loadOrdersForUser(user.uid);
    } else {
      loadCartData(JSON.parse(localStorage.getItem("cart")) || []);
    }

    loadProducts();
  }, []);

  return (
    <div className="App">
      <Navbar {...props} />
      <div className="main-div">
        <Routes {...props} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...cartactions, ...useractions }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
