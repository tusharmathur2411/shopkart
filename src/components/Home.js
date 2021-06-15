import React, { Component } from 'react'
import Product from './Product.js'
import '../styles/Home.css'

export default class Home extends Component {
    render() {

        const categories = []
        for (let p of this.props.products) {
        const cat = p.category
        if (!categories.includes(cat)) categories.push(cat)
        }

        return (
            <div className="home">
                {categories.map(c => (
                    <div className="category-section" key={`category-${c}`}>
                        <div className="category-header">
                            <hr className="hr-line"></hr>
                            <h1>{c.toUpperCase()}</h1>
                            <hr className="hr-line"></hr>
                        </div>
                        <div className="category-div">
                            {this.props.products
                                .filter(p => p.category === c)
                                .map((p,i) => 
                                    <Product
                                        addToCart={this.props.addToCart}
                                        key={i}
                                        p={p}
                                    />)}
                        </div>
                    </div>
                ))}
                
            </div>
        )
    }
}
