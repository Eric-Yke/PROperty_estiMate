import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './Search.css';
import React, { useState, useEffect, useRef } from 'react';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate
  const inputRef = useRef(null);  // 创建一个引用
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);


  useEffect(() => {
    // 确保Google的库已加载
    if (window.google) {
      const options = {
        types: ['address'],
        componentRestrictions: { country: 'au' },
        language: 'en'  // 设置返回结果的语言为英语
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        options
      );

      // 将查询参数对象格式化为字符串的函数
      const formatQueryParams = params => {
        return Object.keys(params)
          .map(key => `${key}=${encodeURIComponent(params[key])}`)
          .join('&');
      };

      autocomplete.addListener('place_changed', async function () {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.formatted_address.includes('NSW')) {
          document.getElementById('autocomplete').value = '';  // 清除输入框的内容
          return;
        }
        //这里返回一个谷歌封装好的地址信息
        console.log('Selected Place:', place);

        // 使用Google提供的地址信息调用您的API
        const params = {
          house_number: getAddressComponent(place, "street_number"),
          street_name: getAddressComponent(place, "route"),
          property_locality: getAddressComponent(place, "locality"),
          post_code: getAddressComponent(place, "postal_code")
        };
        const queryString = formatQueryParams(params);
        const response = await fetch(`https://www.huanself.top/propertyData/fuzzySearch?${queryString}`);
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
  }, []);


  const getAddressComponent = (place, type) => {
    const component = place.address_components.find(component => component.types.includes(type));
    return component ? component.long_name : "";
  }


  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleSearch = () => {
    if (selectedProperty) {
      navigate('/propertyResult', { state: { property: selectedProperty } });
    } else {
      console.log('Please select a property from the list or no property found.', selectedProperty);
    }
  }


  return (
    <div className="search">
      <span className="search-guides">
        <a href="#">By Address</a>
        <a href="#">By Suburb</a>
        <a href="#">History Sales</a>
        <a href="#">Predictions</a>
      </span>
      <span className="search-inputs">
        {/* <input ref={inputRef} type="text" placeholder="Search suburb, postcode or state" value={input} onChange={handleInputChange} /> */}
        {/* <input type="text" placeholder="Search suburb, postcode or state" value={input} onChange={handleInputChange} /> */}
        <input id="autocomplete" type="text" placeholder="Search suburb, postcode or state" />

        <button onClick={handleSearch} className="btn-search">Search</button>
        <button className="btn-filter">Filter</button>
      </span>
      {properties.length > 1 && (
        <ul className="property-list">
          {properties.map(property => (
            <li key={property.property_id} onClick={() => setSelectedProperty(property)}>
              {property.house_number} {property.street_name}, {property.property_locality} {property.post_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
