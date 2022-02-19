import "../styles/App.css";
import React, { useEffect } from "react";
import Topbar from "./Topbar";
import * as cartactions from "../redux/actions/cartactions";
import * as AuthActions from "../features/AuthPage/Auth.actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routes from "../routes";

const App = (props) => {
  const {
    user,
    fetchUser,
    loadCartData,
    loadCartForUser,
    loadOrdersForUser,
    fetchProductsList
  } = props;

  useEffect(() => {
    fetchUser();
    fetchProductsList();
  }, []);

  return (
    <div className="App">
      <Topbar />
      <div className="main-div">
        <Routes {...props} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...cartactions, ...AuthActions }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
