import React from 'react'
import '../../styles/ProductPage.css'
import loading from '../../assets/loading.svg';
import { connect } from 'react-redux';
import * as CartActions from "../Cart/Cart.actions";
import { bindActionCreators } from "redux";

const ProductPage = props => {
    const { match, user, cart, products, addToCart, updateCart } = props
    const productId = Number(match.params.id);

    if (!products || Object.keys(products).length===0) return (
        <div className="loading" style={{display: "flex", justifyContent: "center"}}>
            <img width="50%" src={loading} alt="loading"/>
        </div>
    );

    const { image, title, price, description } = products[productId]

    const updateCartWithUser = (...args) => updateCart(user, cart, ...args);

    return (
        <div className="product-page">
            <div className="product-img-div" style={{backgroundImage: `url(${image})`}}></div>
            <div className="product-info-div">
                <h1>{title}</h1>
                <b>Price: </b><span>$ {price}</span><br/><br/>
                <b>Description</b><br/>
                <p>{description}</p>
                <div>
                    {
                        (cart[productId])?
                        (<div className="op-div">
                            <button
                            className="op-btn"
                            onClick={() => {
                                updateCartWithUser(productId, cart[productId]-1);
                            }}
                            >
                            -
                            </button>
                            <h3>{cart[productId]}</h3>
                            <button
                            className="op-btn"
                            onClick={() => {
                                updateCartWithUser(productId, cart[productId]+1);
                            }}
                            >
                            +
                            </button>
                        </div>):
                        <button
                            className="add-btn"
                            onClick={() => {addToCart(productId, user, cart)}}
                        >
                            Add to cart
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
