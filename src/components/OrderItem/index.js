import { Link } from "react-router-dom";

const OrderItem = ({ p }) => (
    <Link className="order-item-div link" to={`/product/${p.id}`}>
      <div
        className="cart-item-img"
        style={{ backgroundImage: `url(${p.image})` }}
      ></div>
      <div className="cart-item-mid">
        <h4>{p.title}</h4>
        <b>
          {p.quantity} X $ {p.price} = $ {p.price * p.quantity}
        </b>
      </div>
    </Link>
);

export default OrderItem;