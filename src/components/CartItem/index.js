import Loading from "../Loading";
import { Link } from "react-router-dom";

const CartItem = ({ item, updateCart, cartLoading }) => (
    <div className="cart-item">
      <Link
        to={`/product/${item.id}`}
        className="cart-item-img"
        style={{ backgroundImage: `url(${item.image})` }}
      ></Link>
      {/* <div className="cart-item-img" style={{backgroundImage: `url(${p.image})`}}></div> */}
      <Link to={`/product/${item.id}`} className="cart-item-mid link">
        <h4>{item.title}</h4>
        <b>
          {item.quantity} X $ {item.price} = $ {item.price * item.quantity}
        </b>
      </Link>
      <div>
        <div className="btn-container">
          {cartLoading ? <Loading /> : ""}
          <div className="op-div">
            <button
              className="op-btn"
              onClick={() => {
                updateCart(item.id, item.quantity-1);
              }}
            >
              -
            </button>
            <h3>{item.quantity}</h3>
            <button
              className="op-btn"
              onClick={() => {
                updateCart(item.id, item.quantity+1);
              }}
            >
              +
            </button>
          </div>
          <button
            className="op-btn"
            onClick={() => {
              updateCart(item.id, 0);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
  
export default CartItem;