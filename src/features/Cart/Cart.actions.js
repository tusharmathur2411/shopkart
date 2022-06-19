import getCartForUserService from "../../services/getCartForUser.service";
import getProductsList from "../../services/getProductsList.service";
import updateCartForUserService from "../../services/updateCartForUser.service";

const combineCarts = (cart1, cart2) => {
  let newCart = { ...cart2 };
  Object.keys(cart1).forEach((key) => {
    if (newCart[key]) newCart[key]+=cart1[key];
    else newCart[key] = cart1[key];
  })
  return newCart;
};

export function loadCartData(cart) {
    return {
      type: "LOAD_CART",
      cart
    };
}

export function loadCartForUser() {
    return (dispatch) => {
        dispatch({ type: "CART_LOADING" });
        return getCartForUserService()
            .then((res) => {
                const localCart = JSON.parse(localStorage.getItem("cart")) || {};
                if (localCart && Object.keys(localCart).length > 0) {
                    const newCart = combineCarts(localCart, res || {});
                    updateCartForUserService(newCart)
                        .then((res) => {
                            dispatch(loadCartData(res));
                            localStorage.setItem("cart", JSON.stringify({}));
                        });
                } else dispatch(loadCartData(res));
            });
    };
}

const addProductToCart = (cart, productId) => {
    let newCart = { ...cart };
    if (cart[productId]) newCart[productId]++;
    else newCart[productId] = 1;
    return newCart;
};

export function addToCart(productId, user, cart) {
  
    return async (dispatch) => {
      dispatch({ type: "CART_LOADING" });
  
      const newCart = addProductToCart(cart || {}, productId);
      if (user) {
        updateCartForUserService(newCart)
            .then((res) => {
                dispatch(loadCartData(res))
            });
      } else {
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(loadCartData(newCart));
      }
    };
};

export function updateCart(user, cart, productId, productQuantity) {
  
    return async (dispatch) => {
        dispatch({ type: "CART_LOADING" });
        const newCart = { ...cart };
        if (productQuantity===0) delete newCart[productId]
        else newCart[productId] = productQuantity

        if (user) {
            updateCartForUserService(newCart)
                .then((res) => {
                    dispatch(loadCartData(res))
                });
        } else {
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch(loadCartData(newCart));
        }
    };
}

export function emptyCart() {
    return async (dispatch) => {
      dispatch({ type: "CART_LOADING" });
      updateCartForUserService({})
        .then((res) => {
          localStorage.setItem("cart", JSON.stringify(res));
          dispatch(loadCartData(res));
        });
    };
}


export function fetchProductsList() {
  return (dispatch) => {
    dispatch({ type: "CART_LOADING" });
    getProductsList()
      .then((res) => {
        const productList = {}
        res.forEach(product => productList[product.id] = product )
            
        dispatch({
          type: "LOAD_PRODUCTS",
          products: productList
        });
      });
  };
}