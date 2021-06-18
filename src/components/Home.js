import React, { useState } from 'react'
import Product from './Product.js'
import '../styles/Home.css'

const Home = (props) => {

    const [ search, setSearch ] = useState('')
    const [ filter, setFilter ] = useState(false)
    const [ filterList, setFilterList ] = useState([])

    const categories = []
    for (let p of props.products) {
        const cat = p.category
        if (!categories.includes(cat)) categories.push(cat)
    }

    const onFilter = (e) => {
        const value = e.target.id
        if (e.target.checked) setFilterList(fl => {
            if (!filterList.includes(value)) return [...fl, value]
        })
        else setFilterList(fl => {
            const index = filterList.findIndex(v => v===value)
            return fl.splice(index, 1)
        })
    }

    return (
        <div>
            <div className="search-filter">
                <input type="search" className="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                <div>
                        {
                            filter &&
                            <div className='filter-options'>
                                <b>CATEGORIES</b>
                                {categories.map((c,i) => (
                                    <div key={i}>
                                        <input type="checkbox" id={c} onChange={onFilter} checked={filterList.includes(c)}></input>
                                        <label for={c}>{c.toUpperCase()}</label>
                                    </div>
                                ))}
                            </div>
                        }
                    <div onClick={() => setFilter(f => !f)} className="filter" style={{backgroundColor: filter?"#222":"white"}} >
                        <img src="https://img.icons8.com/material-sharp/24/fa314a/chevron-left.png" style={filter?{transform: "rotate(180deg)"}:{}} alt="" />
                        <img src="https://img.icons8.com/carbon-copy/50/fa314a/filter.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="home">
                <div className="category-div">
                    {props.products
                        .filter(p => filterList.length===0 || filterList.includes(p.category))
                        .filter(p => p.title.toLowerCase().includes(search))
                        .map((p,i) => 
                        <Product
                                addToCart={props.addToCart}
                                key={i}
                                p={p}
                            />)
                    }
                </div>          
            </div>
        </div>
    )
}

export default Home;