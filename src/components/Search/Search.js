import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './Search.css';
import React, { useState, useEffect, useRef } from 'react';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate
  const inputRef = useRef(null);  // 创建一个引用


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

      autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.formatted_address.includes('NSW')) {
          document.getElementById('autocomplete').value = '';  // 清除输入框的内容
          return;
        }
        console.log('Selected Place:', place);

        // 获取邮政编码
        const postalCodeComponent = place.address_components.find(component => component.types.includes('postal_code'));
        if (postalCodeComponent) {
          const postalCode = postalCodeComponent.long_name;
          console.log('Postal Code:', postalCode);
        }
      });

    }
  }, []);





  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  const handleSearch = () => {
    // 我们后面可以在这里进行搜索逻辑处理，如调用API获取数据
    console.log('Search: ', input);
    navigate('/propertyResult'); // 导航到 propertyResult 页面
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
    </div>
  );
};

export default Search;
