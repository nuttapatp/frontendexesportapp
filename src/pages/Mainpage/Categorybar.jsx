
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import "./categorybar.css";

import { Link } from 'react-router-dom';




function Categorybar({ onBrandChange, onTypeChange }) {
  const [shoeData, setShoeData] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [showShoeList, setShowShoeList] = useState(false);
  const [brandData, setBrandData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    // Fetch brand data using Axios and set it to brandData state
    async function fetchBrandData() {
      try {
        const response = await axios.get(
          "https://backendexesportapp-93e0c67ee387.herokuapp.com/brands/"
        );
        const allBrands = response.data.brands;
        setBrandData(allBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

    fetchBrandData();
  }, []); 

  const onClickHandler = async (brandName) => {
    console.log("Selected brand:", brandName);
    try {
      const response = await axios.get(
        `https://backendexesportapp-93e0c67ee387.herokuapp.com/brands/${brandName}`
      );
      const allShoes = response.data.products;

 
      const filteredShoes = allShoes.filter(
        (shoe) => shoe.brand_name === brandName
      );

      onBrandChange(brandName); 
      setShowShoeList(true);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  useEffect(() => {
    async function fetchTypeData() {
      try {
        const response = await axios.get(
          "https://backendexesportapp-93e0c67ee387.herokuapp.com/type/"
        );
        const allTypes = response.data.type;
        setTypeData(allTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }

    fetchTypeData();
  }, []);

  const onTypeClickHandler = async (typeName) => {
    console.log("Selected type:", typeName);
    try {
      const response = await axios.get(
        `https://backendexesportapp-93e0c67ee387.herokuapp.com/${typeName}`
      );
      const allShoes = response.data.products;

      const filteredShoes = allShoes.filter(
        (shoe) => shoe.prod_type === typeName
      );

      onTypeChange(filteredShoes); 
      setShowShoeList(true);
    } catch (error) {
      console.error("Error fetching shoes based on type:", error);
    }
  };

  return (
    <div>
      <div className="cate-bar">
        <div className="category-item">
          <div className="category-type">
            <span>SHOES</span>
            <div className="dropdown-content">
              <Link to="/brands/NIKE" onClick={() => onClickHandler("NIKE")}>
                NIKE
              </Link>

              <Link
                to="/brands/ADIDAS"
                onClick={() => onClickHandler("ADIDAS")}
              >
                ADIDAS
              </Link>

              <Link to="/brands/UMBRO" onClick={() => onClickHandler("UMBRO")}>
                UMBRO
              </Link>

              <Link to="/brands/PUMA" onClick={() => onClickHandler("PUMA")}>
                PUMA
              </Link>

              <Link
                to="/brands/NEWBALANCE"
                onClick={() => onClickHandler("NEWBALANCE")}
              >
                NEW BALANCE
              </Link>
             
            </div>
          </div>
        </div>
        <div className="category-item">
          <span>TYPE</span>
          <div className="dropdown-content">
            <Link
              to="/type/SOCCER"
              onClick={() => onTypeClickHandler("SOCCER")}
            >
              SOCCER
            </Link>

            <Link
              to="/type/RUNNING"
              onClick={() => onTypeClickHandler("RUNNING")}
            >
              RUNNING
            </Link>

            <Link
              to="/type/FUTSAL"
              onClick={() => onTypeClickHandler("FUTSAL")}
            >
              FUTSAL
            </Link>
            <Link
              to="/type/FREESTYLE"
              onClick={() => onTypeClickHandler("FREESTYLE")}
            >
              FREESTYLE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorybar;
