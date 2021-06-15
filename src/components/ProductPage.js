import React, { Component } from 'react'
import '../styles/ProductPage.css'
import loading from '../loading.svg';


export default class ProductPage extends Component {
    render() {
        const { match, products } = this.props
        const id = Number(match.params.id);
        const p = products.find(p => p.id===id)
    
        return p?(
            <div className="product-page">
                <div className="product-img-div" style={{backgroundImage: `url(${p.image})`}}></div>
                <div className="product-info-div">
                    <h1>{p.title}</h1>
                    <b>Price: </b><span>$ {p.price}</span><br/><br/>
                    <b>Description</b><br/>
                    <p>{p.description}</p>
                    <div>
                    <button
                        className="add-btn"
                        onClick={() => {this.props.addToCart(p)}}
                    >
                        Add to cart
                    </button>
                    </div>
                </div>
            </div>
        ):(<div className="loading" style={{display: "flex", justifyContent: "center"}}><img width="50%" src={loading} alt="loading"/></div>)
    }
}
