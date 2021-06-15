import React, { Component } from 'react'
import "../styles/Cart.css"
import { Link } from 'react-router-dom'
import Loading from './Loading'

export default class Cart extends Component {

    constructor() {
        super();
        this.placeOrder = this.placeOrder.bind(this)    
    }

    placeOrder() {
        const order = {
            items: this.props.cart,
            createDate: new Date(),
            totalAmount: this.props.cart.reduce((a,c) => (a + (c.price * c.count)), 0).toFixed(2)
        }

        fetch(`https://shopkart-2411-default-rtdb.firebaseio.com/orders/${this.props.user.uid}.json`,
        {method:"POST", headers:{'Content-type': 'application/json'}, body: JSON.stringify(order)})
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.props.emptyCart(this.props.user.uid)
                this.props.history.push('/checkout')
            })

    }

    render() {
        
        if (this.props.cart && this.props.cart.length > 0)
        return (
            <div className="cart">
                <div className="cart-left">
                    {this.props.cart.map((p,i) => 
                        <CartItem key={i} p={p} updateCart={this.props.updateCart} {...this.props}/>
                        )
                    }
                </div>
                <div className="cart-right">
                    <span>
                        <b>Total: </b>$ {this.props.cart.reduce((a,c) => (a + (c.price * c.count)), 0).toFixed(2)}<br/>
                    </span>
                    {this.props.user?
                        <button className="add-btn link" onClick={this.placeOrder}>Place Order</button>:
                        <Link className="add-btn link" to="/signin/cart">Sign In to Place Order</Link>
                    }
                    {this.props.user?"":<b>NOTE: Current cart will be merged with your cart when you sign in.</b>}
                </div>
            </div>
        )
        else return (<div className="cart-empty"><h1>Cart is empty.<br/><Link to="/">Add Items.</Link> </h1></div>)
    }
}

const CartItem = ({p, updateCart, cartLoading}) => <div className="cart-item">
    <Link to={`/product/${p.id}`} className="cart-item-img" style={{backgroundImage: `url(${p.image})`}}></Link>
    {/* <div className="cart-item-img" style={{backgroundImage: `url(${p.image})`}}></div> */}
    <Link to={`/product/${p.id}`} className="cart-item-mid link">
        <h4>{p.title}</h4>
        <b>{p.count} X $ {p.price} = $ {p.price * p.count}</b>
    </Link>
    <div>
        <div className="btn-container">
            {cartLoading?<Loading/>:""}
            <div className="op-div">
                <button className="op-btn" onClick={() => {updateCart(p, 0)}}>-</button>
                <h3>{p.count}</h3>
                <button className="op-btn" onClick={() => {updateCart(p, 1)}}>+</button>
            </div>
            <button className="op-btn" onClick={() => {updateCart(p, "r")}}>Remove</button>
        </div>
    </div>
</div>

export {CartItem};