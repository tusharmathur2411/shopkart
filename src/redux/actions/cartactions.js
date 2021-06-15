import { db,auth } from '../../firebase'

const cartAddLogic = (cart, product) => {
    const current = cart.find(f => f.id===product.id)
    if (current===undefined) {
        product.count = 1
        return [...cart, product]
    }
    else{
        return cart.map(i => (i.id===product.id? {...i, count: i.count+1} : i))
    }
}

const combineCarts = (cart1, cart2) => {

    for (let pr of cart1) {
        const current = cart2.find(f => f.id===pr.id)
        if (current===undefined) {
            cart2 =  [...cart2, pr]
        }
        else{
            cart2 = cart2.map(i => (i.id===pr.id? {...i, count: (i.count+pr.count)} : i))
        }
    }

    return cart2
}

export function loadProducts(products) {
    return {
        type: "LOAD_PRODUCTS",
        products
    }
}

export function loadCartData(cart) {
    return {
        type: "LOAD_CART",
        cart
    }
}

export function addToCart(product) {

    const user = auth.currentUser?.uid

    const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`

    let cart = []

    return user?(dispatch) => {
        dispatch({type: "CART_LOADING"})
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                    cart = cartAddLogic(res||[],product)
                    db.ref(`cart/${user}`).update(cart).then(() => {
                        dispatch(loadCartForUser(user))
                    }).catch((error) => {
                        console.log(error)
                    })                
                }
                )
    }:(dispatch) => {
        cart = cartAddLogic(JSON.parse(localStorage.getItem("cart")) || [], product)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch(loadCartData(cart))
    }
}

export function updateCart(product, op) {

    const user = auth.currentUser?.uid

    const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`

    let cart = []    

    return user?(dispatch) => {
        dispatch({type: "CART_LOADING"})
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                    if (op === "r") cart = res.filter(i => i.id !== product.id)
                    else cart = res.map(i => (i.id===product.id? {...i, count: op?i.count+1:i.count-1} : i)).filter(i => i.count !== 0)
                    fetch(`https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`,
                        {method: 'PUT', headers:{'Content-type': 'application/json'}, body: JSON.stringify(cart) }
                        )
                    .then(res => res.json())
                    .then(res => {
                        dispatch(loadCartData(cart))
                    })
                })
    }:(dispatch) => {    
        const res = JSON.parse(localStorage.getItem("cart")) || []
        if (op === "r") cart = res.filter(i => i.id !== product.id)
        else cart = res
                    .map(i => (i.id===product.id? {...i, count: op?i.count+1:i.count-1} : i))
                    .filter(i => i.count !== 0)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch(loadCartData(cart))
    }
}

export function loadCartForUser(user) {
    return (dispatch) => {
        dispatch({type: "CART_LOADING"})
        const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`
        return fetch(url)
        .then(res => res.json())
        .then(res => {
            const localCart = JSON.parse(localStorage.getItem("cart") || [])
            if (localCart && localCart.length > 0) {
                const updatedCart = combineCarts(localCart, res || [])
                fetch(`https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`,
                        {method: 'PUT', headers:{'Content-type': 'application/json'}, body: JSON.stringify(updatedCart) }
                        )
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        dispatch(loadCartData(updatedCart))
                        localStorage.setItem("cart", JSON.stringify([]))
                    })

            }
            else dispatch(loadCartData(res))
        })
    }
}

export function emptyCart(user) {
    return (dispatch) => {
        dispatch({type: "CART_LOADING"})
        const url = `https://shopkart-2411-default-rtdb.firebaseio.com/cart/${user}.json`
        return fetch(url, {method: 'DELETE'})
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem("cart", JSON.stringify([]))
                    dispatch(loadCartForUser())                    
                })
    }
}

export function loadOrdersForUser(user) {
    return (dispatch) => {
        // dispatch({type: "CART_LOADING"})
        const url = `https://shopkart-2411-default-rtdb.firebaseio.com/orders/${user}.json`
        return fetch(url)
                .then(res => res.json())
                .then(res => {
                    dispatch({type: "LOAD_ORDERS", orders: res})                  
                })
    }
}