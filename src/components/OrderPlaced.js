import { Link } from "react-router-dom";

const OrderPlaced = () => (
    <div className="order-placed">
        <h1>
            THANK YOU!<br/>
            Order Placed Successfully.<br/>
            <Link className="bl-link" to="/orders">See all orders</Link> or <Link className="bl-link" to="/">Continue Shopping</Link>
        </h1>
    </div>
)

export default OrderPlaced;