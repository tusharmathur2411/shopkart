import cancelOrderService from "../../services/cancelOrder.service";
import createOrderService from "../../services/createOrder.service";
import getOrdersService from "../../services/getOrders.service";
import { emptyCart } from "../Cart/Cart.actions";

export function loadOrdersForUser() {
    return (dispatch) => {
        getOrdersService()
            .then((res) => {
                dispatch({ type: "LOAD_ORDERS", orders: res });
            });
    };
}

export function placeOrder(order, history) {
    return (dispatch) => {
        createOrderService(order)
            .then((res) => {
                dispatch({ type: "ORDER_PLACED", newOrder: res });
                dispatch(emptyCart());
                history.push("/checkout");
            });
    };
}

export function cancelOrder(orderId, setCancel) {
    return (dispatch) => {
        cancelOrderService(orderId)
            .then((res) => {
                dispatch({ type: "UPDATE_ORDERS", orderId, newOrder: res });
                setCancel(false);
                alert(
                    `Order "${orderId}" has been cancelled successfully. Refund of $ ${res.totalAmount} has been initiated.`
                )
            })
    }
}