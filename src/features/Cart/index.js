import React, { useEffect, useState } from "react";
import "../../styles/Cart.css";
import { Link } from "react-router-dom";
import * as CartActions from "./Cart.actions";
import * as AuthActions from "../AuthPage/Auth.actions";
import * as OrderActions from "../Orders/Orders.actions";
import CartItem from "../../components/CartItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Cart = (props) => {

  const { updateCart, user, cart, products, cartLoading, placeOrder } = props;
  const [productCart, setProductCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartProductList = [];

    if (Object.keys(cart).length > 0 && Object.keys(products).length > 0) {
      Object.entries(cart).forEach(([productId, quantity]) => {
        cartProductList.push({ ...products[productId], quantity });
      });
    };
    
    setProductCart(cartProductList);

  }, [cart, products, user]);

  useEffect(() => {
    setTotalAmount(productCart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2)
    );
  }, [productCart]);

  const onPlaceOrder = () => {
    const order = {
      productList: cart,
      totalAmount,
    };

    placeOrder(order, props.history)

  }

  const updateCartWithUser = (...args) => updateCart(user, cart, ...args);

  if (cartLoading) return <div></div>

  if (Object.keys(cart).length === 0) return (
    <div className="cart-empty">
      <h1>
        Cart is empty.
        <br />
        <Link to="/">Add Items.</Link>{" "}
      </h1>
    </div>
  );

  return (
    <div className="cart">
      <div className="cart-left">
        {
          productCart.map((product) => (
            <CartItem
              key={product._id}
              item={product}
              updateCart={updateCartWithUser}
              cartLoading={cartLoading}
            />
          ))
        }
      </div>
      <div className="cart-right">
        <span>
          <b>Total: </b>${" "}
          {totalAmount}
          <br />
        </span>
        {user ? (
          <button className="add-btn link" onClick={onPlaceOrder}>
            Place Order
          </button>
        ) : (
          <Link className="add-btn link" to="/signin/cart">
            Sign In to Place Order
          </Link>
        )}
        {user ? (
          ""
        ) : (
          <b>
            NOTE: Current cart will be merged with your cart when you sign
            in.
          </b>
        )}
      </div>
    </div>
  );
  
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions, ...AuthActions, ...OrderActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);