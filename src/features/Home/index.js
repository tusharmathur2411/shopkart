import React, { useState } from "react";
import ProductTile from "../../components/ProductTile";
import "../../styles/Home.css";
import * as CartActions from "../Cart/Cart.actions";
import * as AuthActions from "../AuthPage/Auth.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Home = (props) => {
  const { user, cart, products, addToCart } = props;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterList, setFilterList] = useState([]);

  const categories = Object.values(products).reduce(
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

  const addToCartWithUser = (product) => addToCart(product, user, cart);

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
                  <label htmlFor={c}>{c.toUpperCase()}</label>
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
          {Object.values(products)
            .filter(
              (product) => filterList.length === 0 || filterList.includes(product.category)
            )
            .filter((product) => product.title.toLowerCase().includes(search))
            .map((product) => (
              <ProductTile addToCart={addToCartWithUser} key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...CartActions, ...AuthActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
