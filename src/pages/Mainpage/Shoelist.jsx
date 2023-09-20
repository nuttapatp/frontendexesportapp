import React, { useState, useEffect } from "react";
import "./Shoelist.css";
import axios from "axios"; 
import { useParams, Link } from "react-router-dom"; 
import Navbar from "./Navbar";
import Categorybar from "./Categorybar";
import Searchbar from "./Searchbar";
import StoreDetails from "..//..//components/StoreDetails";

import nikeImage1 from "..//../assets/brand_images/nike1.jpg";
import adidasImage1 from "..//../assets/brand_images/adidas1.jpg";
import nikeImage2 from "..//../assets/brand_images/nike2.jpg";
import adidasImage2 from "..//../assets/brand_images/adidas2.jpg";
import nikeImage3 from "..//../assets/brand_images/nike3.jpg";
import adidasImage3 from "..//../assets/brand_images/adidas3.jpg";
import umbroImage1 from "..//../assets/brand_images/umbro1.jpg";
import umbroImage2 from "..//../assets/brand_images/umbro2.jpg";
import umbroImage3 from "..//../assets/brand_images/umbro3.jpg";
import pumaImage1 from "..//../assets/brand_images/puma1.png";
import pumaImage2 from "..//../assets/brand_images/puma2.jpg";
import pumaImage3 from "..//../assets/brand_images/puma3.jpg";
import newbalanceImage1 from "..//../assets/brand_images/nb1.jpg";
import newbalanceImage2 from "..//../assets/brand_images/nb2.jpg";
import newbalanceImage3 from "..//../assets/brand_images/nb3.jpg";

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


export default function Shoelist() {
  const { brandName } = useParams();
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]); // State for filtered product data
  const [selectedBrand, setSelectedBrand] = useState(brandName); // State for selected brand
  const [brandsData, setBrandsData] = useState([]); // State to store brands data
  const [selectedBrandLogo, setSelectedBrandLogo] = useState(""); // State for selected brand's logo
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("M");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSort, setSelectedSort] = useState("max-min");
  const [selectedType, setSelectedType] = useState("SOCCER");

  const additionalImages = {
    NIKE: [nikeImage1, nikeImage2, nikeImage3],
    ADIDAS: [adidasImage1, adidasImage2, adidasImage3],
    UMBRO: [umbroImage1, umbroImage2, umbroImage3],
    PUMA: [pumaImage1, pumaImage2, pumaImage3],
    NEWBALANCE: [newbalanceImage1, newbalanceImage2, newbalanceImage3],
    // Add more brand names and corresponding image paths here
  };

  const applyFiltersAndSort = (products) => {
    let filteredProducts = products.filter(
      (product) =>
        product.brand_name === selectedBrand &&
        product.prod_sex === selectedFilter &&
        product.prod_price >= priceRange[0] &&
        product.prod_price <= priceRange[1] &&
        product.prod_type === selectedType
    );

    if (selectedSort === "max-min") {
      filteredProducts.sort((a, b) => b.prod_price - a.prod_price);
    } else if (selectedSort === "min-max") {
      filteredProducts.sort((a, b) => a.prod_price - b.prod_price);
    }

    setFilteredProductData(filteredProducts);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://backendexesportapp-93e0c67ee387.herokuapp.com/brands/${brandName}`
        );
        const products = response.data.products;
        const brandResponse = await axios.get(
          "https://backendexesportapp-93e0c67ee387.herokuapp.com/brands/"
        );
        const brands = brandResponse.data.brands;
        const selectedBrandData = brands.find(
          (brand) => brand.brand_name === selectedBrand
        );

        if (selectedBrandData) {
          setSelectedBrandLogo(selectedBrandData.logo_image);
        }

        setProductData(products);
        setBrandsData(products);

        applyFiltersAndSort(products); // Apply filtering and sorting after setting products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [
    brandName,
    selectedBrand,
    selectedFilter,
    priceRange,
    selectedType,
    selectedSort,
  ]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % additionalImages[selectedBrand].length
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedBrand]);

  const formatBrandName = (brandName) => {
    console.log("Formatting:", brandName); 
    if (brandName === "NEWBALANCE") {
      return "NEW BALANCE";
    }
    return brandName;
  };
  return (
    <div className="shoe-list-container">
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar
          onBrandChange={handleBrandChange}
          selectedBrand={selectedBrand}
        />
      </div>
      <div className="navbar-logo">
        <div className="logo-image1">
          {selectedBrandLogo && (
            <img
              src={selectedBrandLogo}
              alt={selectedBrand}
              className="brand-logo1"
            />
          )}
        </div>

        <div className="additional-image additional-image-container">
          <div
            className="additional-image-carousel"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {selectedBrand &&
              additionalImages[selectedBrand].map((image, index) => (
                <div className="additional-image-slide" key={index}>
                  <img
                    src={image}
                    alt="Additional Image"
                    className="additional-image"
                  />
                </div>
              ))}
          </div>
        </div>
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

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="SOCCER">Soccer</option>
          <option value="RUNNING">RUNNING</option>
          <option value="FREESTYLE">Freestyle</option>
          <option value="FUTSAL">FUTSAL</option>
        </select>
      </div>

      <div className="shoe-list">
        {filteredProductData.map((product) => (
          <div key={product._id} className="shoe-item">
            <div className="brand-name">
              {/* {formatBrandName(product.brand_name)} */}
            </div>{" "}
            {/* Added Here */}
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
            {/* <div className="brand-name">{product.brand_name}</div> */}
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
