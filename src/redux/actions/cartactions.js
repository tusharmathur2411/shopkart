import { db } from "../../firebase";
import getUserFromToken from "../../services/getUserFromToken.util";
import { SERVER_URL } from "../../constants/AppConstants";

const addProductToCart = (cart, product) => {
  const current = cart.find((f) => f.id === product.id);
  if (current === undefined) {
    product.count = 1;
    return [...cart, product];
  } else {
    return cart.map((i) =>
      i.id === product.id ? { ...i, count: i.count + 1 } : i
    );
  }
};

const combineCarts = (cart1, cart2) => {
  for (let pr of cart1) {
    const current = cart2.find((f) => f.id === pr.id);
    if (current === undefined) {
      cart2 = [...cart2, pr];
    } else {
      cart2 = cart2.map((i) =>
        i.id === pr.id ? { ...i, count: i.count + pr.count } : i
      );
    }
  }

  return cart2;
};

export function fetchProductsList() {
  return (dispatch) => {
    fetch(`${SERVER_URL}/products`)
      .then((res) => res.json())
      .then((res) => {
        res = res.map((p) => ({ ...p, quantity: 20, seller: "shopkart" }));
        dispatch({
          type: "LOAD_PRODUCTS",
          products: res
        });
      });
  };
}

export function loadCartData(cart) {
  return {
    type: "LOAD_CART",
    cart
  };
}

export function addToCart(product) {
  let cart = [];

  return async (dispatch) => {
    dispatch({ type: "CART_LOADING" });
    const user = await getUserFromToken();

    if (user) {
      const { id } = user;

      const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${id}.json`;
      return fetch(url)
        .then((res) => res.json())
        .then((res) => {
          cart = addProductToCart(res || [], product);
          db.ref(`cart/${id}`)
            .update(cart)
            .then(() => {
              dispatch(loadCartForUser(id));
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } else {
      cart = addProductToCart(
        JSON.parse(localStorage.getItem("cart")) || [],
        product
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(loadCartData(cart));
    }
  };
}

export function updateCart(product, op) {
  let cart = [];

  return async (dispatch) => {
    dispatch({ type: "CART_LOADING" });
    const user = await getUserFromToken();
    if (user) {
      const { id } = user;
      const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${id}.json`;
      return fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (op === "r") cart = res.filter((i) => i.id !== product.id);
          else
            cart = res
              .map((i) =>
                i.id === product.id
                  ? { ...i, count: op ? i.count + 1 : i.count - 1 }
                  : i
              )
              .filter((i) => i.count !== 0);
          fetch(url, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(cart)
          })
            .then((res) => res.json())
            .then((res) => {
              dispatch(loadCartData(cart));
            });
        });
    } else {
      const res = JSON.parse(localStorage.getItem("cart")) || [];
      if (op === "r") cart = res.filter((i) => i.id !== product.id);
      else
        cart = res
          .map((i) =>
            i.id === product.id
              ? { ...i, count: op ? i.count + 1 : i.count - 1 }
              : i
          )
          .filter((i) => i.count !== 0);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(loadCartData(cart));
    }
  };
}

export function loadCartForUser(id) {
  return (dispatch) => {
    dispatch({ type: "CART_LOADING" });
    const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${id}.json`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const localCart = JSON.parse(localStorage.getItem("cart") || []);
        if (localCart && localCart.length > 0) {
          const updatedCart = combineCarts(localCart, res || []);
          fetch(url, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedCart)
          })
            .then((res) => res.json())
            .then((res) => {
              dispatch(loadCartData(updatedCart));
              localStorage.setItem("cart", JSON.stringify([]));
            });
        } else dispatch(loadCartData(res));
      });
  };
}

export function emptyCart() {
  return async (dispatch) => {
    const { id } = await getUserFromToken();
    dispatch({ type: "CART_LOADING" });
    const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${id}.json`;
    return fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch(loadCartForUser());
      });
  };
}

export function loadOrdersForUser(id) {
  return (dispatch) => {
    const url = `https://shopkart-2411-default-rtdb.firebaseio.com/orders/${id}.json`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "LOAD_ORDERS", orders: res });
      });
  };
}
