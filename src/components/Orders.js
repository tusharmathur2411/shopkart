import { Component, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Orders.css';

export default class Orders extends Component {

    constructor() {
        super();
        this.onCancel = this.onCancel.bind(this)
    }

    onCancel(oid,amt) {
        const delurl = `https://shopkart-2411-default-rtdb.firebaseio.com/orders/${this.props.user.uid}/${oid}.json`
        fetch(delurl, {method: 'DELETE'})
            .then(res => res.json())
            .then(res => {
                this.props.loadOrdersForUser(this.props.user.uid)
                alert(`Order "${oid}" has been cancelled successfully. Refund of $ ${amt} has been initiated.`)
                if (!(this.propsorders && this.propsorders.length > 0)) this.props.history.push('/')
            })
    }

    render() {
        const {orders} = this.props
        if (orders && Object.keys(orders).length > 0)
        return (
            <div className="orders-page">
                {Object.keys(orders).map(k => <Order order={orders[k]} key={k} oid={k} onCancel={this.onCancel}/>)}
            </div>
        )
        else return (
            <div className="cart-empty">
                <h1 style={{textAlign: "center"}}>
                    No orders to show.<br/>
                    <Link to="/">Continue Shopping</Link> OR <Link to="/cart">Go to Cart</Link>.
                </h1>
            </div>)
    }
}

const Order = ({order, oid, onCancel}) => {
    
    const [cancel, setcancel] = useState(false)
    
    return (
    <div className="order-div">
        <div className="order-items-list">
            {order.items.map((i,k) => <OrderItem p={i} key={k}/>)}
        </div>
        <div className="order-info">
            <span><b>Order Id:</b> {oid}</span>
            <span><b>Order Date:</b> {(new Date(order.createDate)).toLocaleDateString()}</span>
            <span><b>Amount Paid:</b> $ {order.totalAmount}</span>
            {cancel?<div className="confirm-cancel">
                <b>Are you sure you want to cancel the order?<br/>This action cannot be reversed.</b><br/>
                <button className="add-btn" style={{backgroundColor: "green", color: "white"}} onClick={() => {onCancel(oid, order.totalAmount)}}>Yes, Cancel</button>
                <button className="add-btn" style={{backgroundColor: "red", color: "white"}} onClick={() => {setcancel(false)}}>No, Go Back</button>
            </div>:
            (((new Date()) - new Date(order.createDate)) < (1000 * 60 * 60 *24 * 7 ))?
                <button className="add-btn" onClick={() => {setcancel(true)}}>Cancel Order</button>:
                <button className="add-btn" style={{backgroundColor: "grey", color: "#222"}} disabled>Order cannot be cancelled</button>}
        </div>
    </div>
    )
}

const OrderItem = ({p}) => (
    <Link className="order-item-div link" to={`/product/${p.id}`}>
        <div className="cart-item-img" style={{backgroundImage: `url(${p.image})`}}></div>
        <div className="cart-item-mid">
            <h4>{p.title}</h4>
            <b>{p.count} X $ {p.price} = $ {p.price * p.count}</b>
        </div>
    </Link>
)