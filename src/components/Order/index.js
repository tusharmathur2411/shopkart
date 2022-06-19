import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as OrderActions from "../../features/Orders/Orders.actions";
import { bindActionCreators } from "redux";
import OrderItem from "../../components/OrderItem";

const Order = (props) => {
    const [cancel, setCancel] = useState(false);
    const [orderProducts, setOrderProducts] = useState([]);
    const { order: { _id: id, productList, createDate, totalAmount, status }, products, cancelOrder } = props;

    useEffect(() => {
      const orderProductList = [];

      if (Object.keys(productList).length > 0 && Object.keys(products).length > 0) {
        Object.entries(productList).forEach(([productId, quantity]) => {
          orderProductList.push({ ...products[productId], quantity });
        });
      };

      setOrderProducts(orderProductList);
    }, [productList, products])
  
    return (
      <div className="order-div">
        <div className="order-items-list">
          {orderProducts.map((i, k) => (
            <OrderItem p={i} key={k} />
          ))}
        </div>
        <div className="order-info">
          <span>
            <b>Order Id:</b> {id}
          </span>
          <span>
            <b>Order Date:</b> {new Date(createDate).toLocaleDateString()}
          </span>
          <span>
            <b>Amount Paid:</b> $ {totalAmount}
          </span>
          <span>
            <b>Status:</b> {status}
          </span>
          {cancel ? (
            <div className="confirm-cancel">
              <b>
                Are you sure you want to cancel the order?
                <br />
                This action cannot be reversed.
              </b>
              <br />
              <button
                className="add-btn"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => {
                  cancelOrder(id, setCancel);
                }}
              >
                Yes, Cancel
              </button>
              <button
                className="add-btn"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  setCancel(false);
                }}
              >
                No, Go Back
              </button>
            </div>
          ) : new Date() - new Date(createDate) <
            1000 * 60 * 60 * 24 * 7 ? (
            <button
              className="add-btn"
              onClick={() => {
                setCancel(true);
              }}
              disabled={status.toLowerCase()==="cancelled"}
            >
              Cancel Order
            </button>
          ) : (
            <button
              className="add-btn"
              style={{ backgroundColor: "grey", color: "#222" }}
              disabled
            >
              Order cannot be cancelled
            </button>
          )}
        </div>
      </div>
    );
  };


const mapStateToProps = (state) => ({ products: state.products });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...OrderActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Order);