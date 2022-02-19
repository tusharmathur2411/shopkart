import React, { useState } from "react";
import Product from "./Product.js";
import "../styles/Home.css";

const Home = (props) => {
  const { products, addToCart } = props;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterList, setFilterList] = useState([]);

  const categories = products.reduce(
    (categoryList, { category }) =>
      categoryList.includes(category)
        ? categoryList
        : [...categoryList, category],
    []
  );

  const handleFilterChange = (e) => {
    const {
      target: { id, checked }
    } = e;
    setFilterList((filters) =>
      checked ? [...filters, id] : filters.filter((filter) => filter !== id)
    );
  };

  return (
    <div>
      <div className="search-filter">
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div>
          {filter && (
            <div className="filter-options">
              <b>
                CATEGORIES
                <button
                  onClick={() => setFilterList([])}
                  style={{
                    background: "none",
                    color: "white",
                    textDecoration: "underline",
                    border: "none",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  Clear all
                </button>
              </b>
              {categories.map((c, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    id={c}
                    onChange={handleFilterChange}
                    checked={filterList.includes(c)}
                  ></input>
                  <label for={c}>{c.toUpperCase()}</label>
                </div>
              ))}
            </div>
          )}
          <div
            onClick={() => setFilter((f) => !f)}
            className="filter"
            style={{ backgroundColor: filter ? "#222" : "white" }}
          >
            <img
              src="https://img.icons8.com/material-sharp/24/fa314a/chevron-left.png"
              style={filter ? { transform: "rotate(180deg)" } : {}}
              alt=""
            />
            <img
              src="https://img.icons8.com/carbon-copy/50/fa314a/filter.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="home">
        <div className="category-div">
          {products
            .filter(
              (p) => filterList.length === 0 || filterList.includes(p.category)
            )
            .filter((p) => p.title.toLowerCase().includes(search))
            .map((p, i) => (
              <Product addToCart={addToCart} key={i} p={p} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
