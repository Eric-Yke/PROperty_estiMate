import { useNavigate } from "react-router-dom";
import "./Search.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchType, setSearchType] = useState("address");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filterParams, setFilterParams] = useState({
    min_price: "",
    max_price: "",
    min_area: "",
    max_area: "",
    post_code: "",
    min_transactions: "",
    max_transactions: "",
  });

  useEffect(() => {
    if (window.google) {
      const options = {
        types: [searchType],
        componentRestrictions: { country: "au" },
        language: "en",
      };
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        options
      );

      const formatQueryParams = (params) => {
        return Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join("&");
      };

      autocomplete.addListener("place_changed", async function () {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.formatted_address.includes("NSW")) {
          document.getElementById("autocomplete").value = "";
          return;
        }

        console.log("Selected Place:", place);

        const params = {
          house_number: getAddressComponent(place, "street_number"),
          street_name: getAddressComponent(place, "route"),
          property_locality: getAddressComponent(place, "locality"),
          post_code: getAddressComponent(place, "postal_code"),
        };
        const queryString = formatQueryParams(params);
        console.log(queryString);
        const response = await fetch(
          `https://www.huanself.top/propertyData/fuzzySearch?${queryString}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("api: ", data);
          setProperties(data);
          if (data.length === 1) {
            setSelectedProperty(data[0]);
          }
        } else {
          console.error("API returned an error:", await response.text());
        }
      });
    }
  }, [searchType]);

  const getAddressComponent = (place, type) => {
    const component = place.address_components.find((component) =>
      component.types.includes(type)
    );
    return component ? component.long_name : "";
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (selectedProperty) {
      navigate("/propertyResult", { state: { property: selectedProperty } });
    } else {
      console.log(
        "Please select a property from the list or no property found.",
        selectedProperty
      );
    }
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  // filter null values
  const filteredParams = Object.keys(filterParams).reduce((params, key) => {
    if (filterParams[key].trim() !== "") {
      params[key] = filterParams[key].trim();
    }
    return params;
  }, {});

  const filterQueryString = new URLSearchParams(filteredParams).toString();

  const handleByAddressClick = () => {
    setSearchType("address");
    document.getElementById("autocomplete").placeholder = "Address";
    document.getElementsByClassName("btn-filter")[0].style.display = "none";
  };

  const handleBySuburbClick = () => {
    setSearchType("suburb");
    document.getElementById("autocomplete").placeholder = "Suburb";
    document.getElementsByClassName("btn-filter")[0].style.display = "block";
  };

  return (
    <div className="search">
      <span className="search-guides">
        <a href="#" onClick={handleByAddressClick}>
          By Address
        </a>
        <a href="#" onClick={handleBySuburbClick}>
          By Suburb
        </a>
        <a href="#">History Sales</a>
        <a href="#">Predictions</a>
      </span>
      <span className="search-inputs">
        <input
          id="autocomplete"
          type="text"
          placeholder="Search suburb, postcode or state"
        />
        <button onClick={handleSearch} className="btn-search">
          Search
        </button>
        <button className="btn-filter" onClick={handleFilter}>
          Filter
        </button>
      </span>
      {properties.length > 1 && (
        <ul className="property-list">
          {properties.map((property) => (
            <li
              key={property.property_id}
              onClick={() => setSelectedProperty(property)}
            >
              {property.house_number} {property.street_name},{" "}
              {property.property_locality} {property.post_code}
            </li>
          ))}
        </ul>
      )}

      {showFilterModal && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <div className="filter-content">
              <h2 id="filterTitle">Filter Options</h2>
              <label>
                Min Price:
                <input
                  className="filterInput"
                  type="text"
                  value={filterParams.min_price}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      min_price: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Max Price:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.max_price}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      max_price: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Min Area:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.min_area}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      min_area: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Max Area:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.max_area}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      max_area: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Post Code:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.post_code}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      post_code: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Min Transactions:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.min_transactions}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      min_transactions: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Max Transactions:
                <input
                  type="text"
                  className="filterInput"
                  value={filterParams.max_transactions}
                  onChange={(e) =>
                    setFilterParams({
                      ...filterParams,
                      max_transactions: e.target.value,
                    })
                  }
                />
              </label>
              <button id="filter_search_button">
                <Link to={`propertyList?${filterQueryString}`}>Search</Link>
              </button>

              <button id="filter_close_button" onClick={handleCloseFilterModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
