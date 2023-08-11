import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './Search.css';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate

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
        <input type="text" placeholder="Search suburb, postcode or state" value={input} onChange={handleInputChange} />
        <button onClick={handleSearch} className="btn-search">Search</button>
        <button className="btn-filter">Filter</button>
      </span>
    </div>
  );
};

export default Search;
