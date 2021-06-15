import React, { Component } from 'react'
import '../styles/Product.css'
import { Link } from 'react-router-dom'

export default class Product extends Component {
    render() {
        const {p} = this.props
        return (
        <div className="product-div">
            <Link className="link product-link" to={`/product/${p.id}`}>
                <div className="img-div" style={{backgroundImage: `url(${p.image})`}}></div>
                <h4>{p.title}</h4>
                <h5>$ {p.price}</h5>
            </Link>
            <button
                className="add-btn"
                onClick={() => {this.props.addToCart(p)}}
            >
                Add to cart
            </button>
        </div>
        )
    }
}