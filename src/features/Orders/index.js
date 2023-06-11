import { Link } from "react-router-dom";
import "../../styles/Orders.css";
import Order from "../../components/Order";
import * as CartActions from "../Cart/Cart.actions";
import * as AuthActions from "../AuthPage/Auth.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const OrdersPage = (props) => {
  const { orders } = props;

  if (orders && Object.keys(orders).length > 0)
    return (
      <div className="orders-page">
        {orders.map((order) => (
          <Order order={order} key={order._id} />
        ))}
      </div>
    );
  else
    return (
      <div className="cart-empty">
        <h1 style={{ textAlign: "center" }}>
          No orders to show.
          <br />
          <Link to="/">Continue Shopping</Link> OR{" "}
          <Link to="/cart">Go to Cart</Link>.
        </h1>
      </div>
    );
}


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions, ...AuthActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
