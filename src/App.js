import "./styles/App.css";
import React, { useEffect } from "react";
import Topbar from "./components/Topbar";
import * as CartActions from "./features/Cart/Cart.actions";
import * as AuthActions from "./features/AuthPage/Auth.actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routes from "./routes";

const App = (props) => {
  const {
    fetchUser,
    fetchProductsList
  } = props;

  useEffect(() => {
    fetchUser();
    fetchProductsList();
  }, [fetchProductsList, fetchUser]);

  return (
    <div className="App">
      <Topbar />
      <div className="main-div">
        <Routes />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions, ...AuthActions }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
