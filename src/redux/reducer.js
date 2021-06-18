import { combineReducers } from 'redux'

const currUser = JSON.parse(sessionStorage.getItem("user"))

function orders(state=[], action) {
    switch (action.type) {
        case "LOAD_ORDERS": return action.orders
        case "LOGOUT": return []
        default: return state
    }    
}

function cartLoading(state=false, action) {
    switch (action.type) {
        case "CART_LOADING": return true
        case "LOAD_CART": return false
        default: return state
    }
}

function user(state=currUser, action) {
    console.log(action)
    switch (action.type) {
        case "LOGIN": return action.user
        case "LOGOUT": return null
        case "UPDATE_NAME": return {...state, displayName: action.updatedName}
        default: return state
    }    
}

function products(state=[], action) {
    switch (action.type) {
        case "LOAD_PRODUCTS": return action.products
        default: return state
    }
}

function cart(state=[], action) {
    switch (action.type) {
        case "LOAD_CART": return action.cart
        case "LOGOUT": return JSON.parse(localStorage.getItem("cart"))
        default: return state
    }
}

export default combineReducers({cartLoading, user, products, cart, orders})