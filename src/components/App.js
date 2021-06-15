import '../styles/App.css';
import React, { Component } from 'react'
import Home from './Home.js'
import SignIn from './SignIn.js';
import Navbar from './Navbar';
import Cart from './Cart';
import * as cartactions from '../redux/actions/cartactions'
import * as useractions from '../redux/actions/useractions'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductPage from './ProductPage';
import SignUp from './SignUp';
import Orders from './Orders';
import OrderPlaced from './OrderPlaced';
// import { Link } from "react-router-dom";


class App extends Component {

  componentDidMount() {

    if (this.props.user) {
      this.props.loadCartForUser(this.props.user.uid)
      this.props.loadOrdersForUser(this.props.user.uid)
    }
    else {
      this.props.loadCartData(JSON.parse(localStorage.getItem("cart")) || [])
    }
    
    fetch("https://shopkart-2411-default-rtdb.firebaseio.com/products.json")
        .then(res => res.json())
        .then(res => {
          res = res.map(p => ({...p, quantity: 20, seller: "shopkart"}))
          
          this.props.loadProducts(res)
        })
    }

  render() {
    return (
      <div className="App">
        <Navbar {...this.props}/>
        <div className="main-div">
        <Switch>
          <Route exact path="/" render={() => <Home {...this.props}/>}/>
          <Route path="/signin" render={() => <SignIn {...this.props}/>}/>
          <Route path="/signup" render={() => <SignUp {...this.props}/>}/>
          <Route path="/cart" render={() => <Cart {...this.props}/>}/>
          <Route path="/checkout" component={OrderPlaced}/>
          <Route path="/orders" render={() => <Orders {...this.props}/>}/>
          <Route path="/product/:id" render={(params) => <ProductPage {...this.props} {...params}/>}/>
          <Route><Redirect to="/" /></Route>
        </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
  // {
  //   user: state.user,
  //   products: state.products,
  //   cart: state.cart
  // }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...cartactions, ...useractions}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));