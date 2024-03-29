import React from 'react'
import '../../styles/Product.css'
import { Link } from 'react-router-dom'

const ProductTile = props => {
    const { product, addToCart, quantityInCart, updateCart } = props;
    
    return (
        <div className="product-div">
            <Link className="link product-link" to={`/product/${product.id}`}>
                <div className="img-div" style={{backgroundImage: `url(${product.image})`}}>
                    <div className='prod-desc-div'>
                        <h4>{product.title}</h4>
                        <hr className="hr2-line"></hr>
                        <h4>$ {product.price}</h4>
                    </div>
                </div>
            </Link>
            {
                quantityInCart ?
                (
                    <div className="product-tile-buttons">
                        <button
                            className="my-btn"
                            onClick={() => {updateCart(product.id, quantityInCart-1)}}
                        >
                            -
                        </button>
                        {quantityInCart}
                        <button
                            className="my-btn"
                            onClick={() => {updateCart(product.id, quantityInCart+1)}}
                        >
                            +
                        </button>
                    </div>
                ) :
                (
                    <button
                        className="my-btn"
                        onClick={() => {addToCart(product.id)}}
                    >
                        Add to cart
                    </button>
                )
            }
        </div>
    )
}

export default ProductTile;