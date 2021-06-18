import React from 'react'
import '../styles/Product.css'
import { Link } from 'react-router-dom'

const Product = props => {
    const {p} = props
    
    return (
        <div className="product-div">
            <Link className="link product-link" to={`/product/${p.id}`}>
                <div className="img-div" style={{backgroundImage: `url(${p.image})`}}>
                    <div className='prod-desc-div'>
                        <h4>{p.title}</h4>
                        <hr className="hr2-line"></hr>
                        <h4>$ {p.price}</h4>
                    </div>
                </div>
            </Link>
            <button
                className="my-btn"
                onClick={() => {props.addToCart(p)}}
            >
                Add to cart
            </button>
        </div>
    )
}

export default Product