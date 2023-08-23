//src/pages/PropertyResult.js

import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import LineCharts from '../components/LineCharts/LineCharts';
import './PropertyResult.css';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';

import {
  GoogleMap, useLoadScript, Marker
} from "@react-google-maps/api";


//设置单词首字母大写的function：
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}


const PropertyResult = () => {
  const location = useLocation();
  const property = location.state ? location.state.property : null;

  // 根据property对象生成地址
  const formattedAddress = property ?
    `${property.house_number} ${titleCase(property.street_name)}, ${titleCase(property.property_locality)}, NSW ${property.post_code}`
    : "Property Address Here";

  //检测窗口大小for折线图
  const cardDivRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);



  // ---------  设置地图  ---------
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { lat: -34.397, lng: 150.644 }; // 可以设置一个默认的中心点

  const [center, setCenter] = useState(defaultCenter);
  const GOOGLE_API_KEY = 'AIzaSyBUOPk08ZvqOMMQYv_FffgYgIhbec-QVuk'; // 请替换为您的API密钥

  async function getLatLng(address) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results[0] && data.results[0].geometry && data.results[0].geometry.location) {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Unable to retrieve coordinates for address.');
    }
  }
  // --------- 设置地图标记  ---------
  const markerIconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            ${FaMapMarkerAlt({ color: "red", size: "40px" }).props.children[0].props.children}
        </svg>
    `;

  useEffect(() => {
    // 设置折线图根据窗口大小而改变
    const handleResize = () => {
      if (cardDivRef.current) {
        setChartWidth(cardDivRef.current.offsetWidth * 0.9);
        setChartHeight(cardDivRef.current.offsetHeight * 0.8);
      }
    };

    // 首次加载时执行
    handleResize();
    // 添加窗口大小变化的事件监听器
    window.addEventListener('resize', handleResize);


    console.log("useEffect is running...");
    console.log("Property:", property);
    console.log("Formatted Address:", formattedAddress);
    // 如果有property对象，则尝试获取其经纬度
    if (property) {
      getLatLng(formattedAddress).then(location => {
        console.log("Fetched Location:", location); // Debug Statement
        setCenter({ lat: location.lat, lng: location.lng });
      }).catch(error => {
        console.error("Failed to get location: ", error);
      });
    }


    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [property, formattedAddress]);




  return (
    <>
      <NavBar />

      <div className="card-title">
        {formattedAddress}
      </div>

      <div className="card">
        <div className="filter-buttons">
          <button className="button">5 year</button>
          <button className="button">10 year</button>
          <button className="button">suburb</button>
          <button className="button">state</button>
        </div>

        <div className="chart-section" ref={cardDivRef}>
          <LineCharts width={chartWidth} height={chartHeight} />
        </div>

        <div className="details-section">
          <div className="details-left">
            {property ? (
              <>
                {/* <p>Area: {property.area}</p>
                <p>Street Name: {property.street_name}</p>
                <p>Locality: {property.property_locality}</p>
                <p>Post Code: {property.post_code}</p> */}

                <div className="details-item">
                  <span className="detail-key">Area</span>
                  <span className="detail-value">{property.area}</span>
                </div>
                <div className="details-item">
                  <span className="detail-key">Street Name</span>
                  <span className="detail-value">{property.street_number ? `${property.street_number} ` : ""}{capitalizeFirstLetter(property.street_name)}</span>
                </div>
                <div className="details-item">
                  <span className="detail-key">Locality</span>
                  <span className="detail-value">{capitalizeFirstLetter(property.property_locality)}</span>
                </div>
                <div className="details-item">
                  <span className="detail-key">Post Code</span>
                  <span className="detail-value">{property.post_code}</span>
                </div>
              </>
            ) : "More Details Here..."}
          </div>
          <div className="details-right">
            <br ></br>
            <table className="table">
              <thead>
                <tr>
                  <th>LOW</th>
                  <th style={{ fontSize: '1.3em' }}>MID</th>
                  <th>HIGH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$980K</td>
                  <td className="special-price">$1.14M</td>
                  <td>$1.3M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 地图卡片 */}

      <div className="card-mapView">

        <GoogleMap
          key="myMap"

          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
        >


          {console.log("Before Marker")}
          <Marker position={center} zIndex={2000} />



          { //使用谷歌地图的地点标记图标。
            <Marker
              position={center}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // 使用Google提供的红色标记图标
                scaledSize: new window.google.maps.Size(80, 80) // 调整图标的大小
              }}
            />}

          {console.log("a Marker")}

        </GoogleMap>

        <div className="map-button">
          <a href={`https://www.google.com/maps/?q=${center.lat},${center.lng}`} target="_blank" rel="noopener noreferrer">Open on Map</a>
        </div>
      </div>


      {/* 历史交易卡片 */}
      <div className="card-hstryTranzac">
        <div className="page-header">
          <h1 id="timeline">History Transaction Timeline</h1>
        </div>
        <ul className="timeline">
          <li>
            <div className="timeline-badge"><FaCheck /></div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">14 Feb 2022</h4>
                <p><small className="text-muted"><big>Property was sold by <big>$157,000</big></big></small></p>
              </div>
              {/* 如果您有任何正文内容，您可以将其包含在这里  */}
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-badge warning"><FaCreditCard /></div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">31 Jan 2018</h4>
                <p><small className="text-muted"><big>Property was sold by <big>$157,000</big></big> </small></p>
              </div>
            </div>
          </li>
          <li>
            <div className="timeline-badge danger"><FaCreditCard /></div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">10 Nov 2016</h4>
                <p><small className="text-muted"><big>Property was sold by <big>$157,000</big></big></small></p>
              </div>
            </div>
          </li>
          {/* add more li items as needed */}
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default PropertyResult;
