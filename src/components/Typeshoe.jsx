import React from "react";
import Navbar from "../pages/Mainpage/Navbar";
import Searchbar from "../pages/Mainpage/Searchbar";
import Categorybar from "../pages/Mainpage/Categorybar";
import { useState, useEffect } from "react";
import axios from "axios";
import StoreDetails from "./StoreDetails";
import "./typeshoe.css";
import { useParams ,Link} from "react-router-dom";


import logo1 from "../assets/logo/free delivery.png";
import logo2 from "../assets/logo/Shoe.png";
import logo3 from "../assets/logo/guard.png";
import logo4 from "../assets/logo/store.png";
import logo5 from "../assets/logo/order return.png";
import logo6 from "../assets/logo/app_store_badge.png";
import logo7 from "../assets/logo/google_play_store.png";
import logo8 from "../assets/logo/instragram.png";
import logo9 from "../assets/logo/line.png";
import logo10 from "../assets/logo/facebook.png";
import logo11 from "../assets/logo/messenger.png";


export default function Typeshoe() {
  const [productData, setProductData] = useState([]);
  const { typeName } = useParams();
  const { brandName } = useParams();
  const [filteredProductData, setFilteredProductData] = useState([]); // State for filtered product data
  const [selectedBrand, setSelectedBrand] = useState(brandName); // State for selected brand

  const [selectedFilter, setSelectedFilter] = useState("M");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSort, setSelectedSort] = useState("max-min");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://frontendexesportapp-l2drnxcsl-nuttapatp.vercel.app/type/${typeName}`
        );
        const products = response.data.products;
        setProductData(products);
        setFilteredProductData(products); // Initialize filtered data with all products

        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [typeName]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedFilter, priceRange, selectedType, selectedSort]);

  const applyFiltersAndSort = () => {
    let filteredProducts = productData.filter(
      (product) =>
        product.prod_sex === selectedFilter &&
        product.prod_price >= priceRange[0] &&
        product.prod_price <= priceRange[1] &&
        (selectedType === "" || product.prod_type === selectedType)
    );

     const onTypeChange = (filteredShoes) => {
       setProductData(filteredShoes);
       setSelectedType(
         filteredShoes.length > 0 ? filteredShoes[0].prod_type : ""
       );
     };

    if (selectedSort === "max-min") {
      filteredProducts.sort((a, b) => b.prod_price - a.prod_price);
    } else if (selectedSort === "min-max") {
      filteredProducts.sort((a, b) => a.prod_price - b.prod_price);
    }

    setFilteredProductData(filteredProducts);
  };

  return (
    <div className="shoe-list-container">
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>

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
            <label>Max Price: ฿{priceRange[1]}</label>
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
      </div>

      <div className="shoe-list">
        {filteredProductData.map((product) => (
          <div key={product._id} className="shoe-item">
            <Link to={`/singleproduct/${product._id}`} className="shoe-link">
              <img
                src={product.product_image}
                alt={product.prod_name}
                className="shoe-image"
              />
              {product.new_arrival && <div className="new-banner">NEW</div>}
            </Link>
            {product.on_sale ? (
              <div className="price-container">
                <span className="sale-price">฿ {product.sale_price}</span>
                <div className="original-price on-sale">
                  ฿ {product.prod_price}
                </div>
              </div>
            ) : (
              <div className="original-price">฿ {product.prod_price}</div>
            )}
            <div className="product-name">{product.prod_name}</div>
          </div>
        ))}
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
