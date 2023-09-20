import React from "react";
import { useEffect, useState, Link,  } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Categorybar from "./Categorybar";

import StoreDetails from "../../components/StoreDetails";

import "./search.css";

import logo1 from "../../assets/logo/free delivery.png";
import logo2 from "../../assets/logo/Shoe.png";
import logo3 from "../../assets/logo/guard.png";
import logo4 from "../../assets/logo/store.png";
import logo5 from "../../assets/logo/order return.png";
import logo6 from "../../assets/logo/app_store_badge.png";
import logo7 from "../../assets/logo/google_play_store.png";
import logo8 from "../../assets/logo/instragram.png";
import logo9 from "../../assets/logo/line.png";
import logo10 from "../../assets/logo/facebook.png";
import logo11 from "../../assets/logo/messenger.png";



import Searchbar from "./Searchbar";
export default function Search() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("M");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedSort, setSelectedSort] = useState("max-min");
  const [selectedType, setSelectedType] = useState("SOCCER");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backendexesportapp-93e0c67ee387.herokuapp.com/products"
        );
        const data = await response.json();
        const allProducts = data.products;

        let filteredProducts = allProducts.filter(
          (product) =>
            product.prod_sex === selectedFilter &&
            product.prod_price >= priceRange[0] &&
            product.prod_price <= priceRange[1] &&
            product.prod_type === selectedType
        );

        if (searchQuery) {
          filteredProducts = filteredProducts.filter((product) =>
            product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (selectedSort === "max-min") {
          filteredProducts.sort((a, b) => b.prod_price - a.prod_price);
        } else if (selectedSort === "min-max") {
          filteredProducts.sort((a, b) => a.prod_price - b.prod_price);
        }

        setSearchResults(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedFilter, priceRange, selectedSort, selectedType]);

  return (
    <div>
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>
      <div>
        <div className="filter-bar">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </select>

          <div>
            <div>
              <label>Max Price: ${priceRange[1]}</label>
            </div>
            <input
              type="range"
              value={priceRange[1]}
              min="0"
              max="10000"
              step="50"
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
          </div>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="max-min">Sort: Max to Min</option>
            <option value="min-max">Sort: Min to Max</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="SOCCER">Soccer</option>
            <option value="RUNNING">Running</option>
            <option value="FREESTYLE">Freestyle</option>
            <option value="FUTSAL">Footsal</option>
          </select>
        </div>
        <h2>Search Results for "{searchQuery}"</h2>
        <div className="shoe-list">
          {searchResults.map((product) => (
            <div key={product._id} className="shoe-item">
              <a href={`/singleproduct/${product._id}`} className="shoe-link">
                {" "}
                <img
                  src={product.product_image}
                  alt={product.prod_name}
                  className="shoe-image"
                />
              </a>
              <div className="product-price">Price: ${product.prod_price}</div>
              <div className="product-name">{product.prod_name}</div>
            </div>
          ))}
        </div>
      </div>

      <StoreDetails
        logo1={logo1}
        logo2={logo2}
        logo3={logo3}
        logo4={logo4}
        logo5={logo5}
        logo6={logo6}
        logo7={logo7}
        logo8={logo8}
        logo9={logo9}
        logo10={logo10}
        logo11={logo11}
      />
    </div>
  );
}
