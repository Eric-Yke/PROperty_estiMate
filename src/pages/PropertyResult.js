//src/pages/PropertyResult.js

import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import LineCharts from '../components/LineCharts/LineCharts';
import './PropertyResult.css';
import { useRef, useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiNumberOne, PiNumberTwo, PiNumberThree, PiNumberFour, PiNumberFive, PiNumberSix, PiNumberSeven, PiNumberEight, PiNumberNine } from 'react-icons/pi'; // 替换为你实际使用的图标库
import {
  GoogleMap, Marker
} from "@react-google-maps/api";
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // Import useParams



//设置单词首字母大写的function：
function titleCase(str) {
  if (!str || typeof str !== 'string') {
    // Handle the error, return a default value or throw an error
    return '';  // 返回空字符串或者其他默认值
  }
  return str.toLowerCase().split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

//预测
function formatPrediction(value) {
  if (value >= 1000000) {
    let millions = Math.floor(value / 1000000);
    let hundredThousands = Math.floor((value % 1000000) / 100000);
    let tenThousands = Math.round((value % 100000) / 10000);  // 使用 Math.round 而不是 Math.floor

    if (tenThousands === 10) {
      tenThousands = 0;
      hundredThousands += 1;
    }
    if (hundredThousands === 10) {  // Handle carry over
      hundredThousands = 0;
      millions += 1;
    }
    return `${millions}.${hundredThousands}${tenThousands}M`;
  } else {
    let hundredThousands = Math.floor(value / 100000);
    let tenThousands = Math.floor((value % 100000) / 10000);
    let thousands = Math.round((value % 10000) / 1000);  // 使用 Math.round 而不是 Math.floor

    if (thousands === 10) {
      tenThousands += 1;
      thousands = 0;
    }
    if (tenThousands === 10) {  // Handle carry over
      tenThousands = 0;
      hundredThousands += 1;
    }

    return `${hundredThousands}${tenThousands}${thousands}K`;
  }
}

const PropertyResult = () => {


  //显示当前页面的完整地址
  const location = useLocation();
  const { postCode, propertyLocality, houseNumberAndStreet } = useParams(); // Inside component
  const [houseNumber, streetName] = houseNumberAndStreet.split('-');
  const [property, setProperty] = useState(null);
  const navigate = useNavigate(); // React Router v6


  // Define or import formatQueryParams
  const formatQueryParams = params => {
    return Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  };

  useEffect(() => { // Inside component
    // Using postCode, propertyLocality, houseNumber, and streetName to fetch data from API
    const params = {
      post_code: postCode,
      property_locality: propertyLocality,
      house_number: houseNumber,
      street_name: streetName
    };
    const queryString = formatQueryParams(params);
    const apiUrl = `https://www.huanself.top/propertyData/fuzzySearch?${queryString}`;
    // 获取数据
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 在控制台查看数据
        // TODO: 在这里设置你的 property 或其他状态变量
        setProperty(data[0]);

      })
      .catch((error) => {
        console.log("获取失败:", error);
      });
    // Perform API call here
  }, [postCode, propertyLocality, houseNumber, streetName]);

  // 根据property对象生成地址
  const formattedAddress = property ?
    `${property.house_number} ${titleCase(property.street_name)}, ${titleCase(property.property_locality)}, NSW ${property.post_code}`
    : "Property Address Here";



  //检测窗口大小for折线图
  const cardDivRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  const midValue = property ? formatPrediction(property.prediction) : '';
  const lowValue = property ? formatPrediction(property.prediction * 0.89) : '';
  const highValue = property ? formatPrediction(property.prediction * 1.11) : '';


  // ---------  设置地图  ---------
  const mapContainerStyle = { width: "100%", height: "100%" };
  const defaultCenter = { lat: -34.397, lng: 150.644 }; // 可以设置一个默认的中心点

  const [center, setCenter] = useState(defaultCenter);
  const GOOGLE_API_KEY = 'AIzaSyBUOPk08ZvqOMMQYv_FffgYgIhbec-QVuk';

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

  // 创建SVG标记图标的URL对象
  const svgBlob = new Blob([markerIconSvg], { type: "image/svg+xml;charset=utf-8" });
  const markerIconUrl = URL.createObjectURL(svgBlob);


  //======== 历史数据处理 =========
  const icons = [PiNumberOne, PiNumberTwo, PiNumberThree, PiNumberFour, PiNumberFive, PiNumberSix, PiNumberSeven, PiNumberEight, PiNumberNine];  //会用到的图标

  // 用于存储历史交易数据的状态
  const [historyData, setHistoryData] = useState(null);

  // 用于获取历史交易数据的useEffect
  useEffect(() => {
    if (property) {
      const propertyId = property.property_id;
      const historyApiUrl = `https://www.huanself.top/transaction/historyTransaction?property_id=${propertyId}`;

      fetch(historyApiUrl, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log("???????")
          setHistoryData(data);  // 存储历史交易数据
        })
        .catch(error => console.error("Failed to fetch history data:", error));
    }
  }, [property]);

  // 用于格式化日期的函数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  // 跳转推荐页面

  const handleSearch = (property) => {
    if (property) {
      const { post_code, property_locality, house_number, street_name } = property;
      const houseNumberAndStreet = `${house_number}-${street_name}`;
      window.open(`/propertyResult/${post_code}/${property_locality}/${houseNumberAndStreet}`, '_blank');
    } else {
      console.log('Please select a property from the list or no property found.', property);
    }
  };



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




  // ======= 用于获取API数据并存储(用于折线图) =======
  const [years, setYears] = useState([2019, 2020, 2021, 2022, 2023, 2024, 2025]);

  const handleButtonClick = (newYears) => {
    console.log("Button clicked, setting years to: ", newYears);

    setYears(newYears);
  };

  const [apiData, setApiData] = useState(null);
  const [chartData, setChartData] = useState([]); // Initial chart data state

  useEffect(() => {
    if (property) {
      const propertyId = property.property_id;
      const apiUrl = `https://www.huanself.top/predict?property_id=${propertyId}`;

      fetch(apiUrl, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log("API Data:", data);  // 打印从API返回的数据
          setApiData(data);
        })
        .catch(error => console.error("Failed to fetch data:", error));
      URL.revokeObjectURL(markerIconUrl);
    };
  }, [property, formattedAddress]);

  useEffect(() => {
    if (property) {
      const propertyId = property.property_id;
      // Fetch recommended properties
      const recommendationUrl = `https://www.huanself.top/transaction/recommendation?property_id=${propertyId}`;
      fetch(recommendationUrl, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log("Recommended Properties:", data);
          // TODO: Use this data to get panorama URLs and set them
        })
        .catch(error => console.error("Failed to fetch recommended properties:", error));

      URL.revokeObjectURL(markerIconUrl);
    };
  }, [property, formattedAddress]);



  useEffect(() => {
    if (apiData) {
      // 找到 "2023" 所在的索引
      const indexOf2023 = years.indexOf(2023); // 注意：确保 years 中的年份是字符串类型，或者根据需要进行转换

      const newChartData = years.map((year, index) => {
        return {
          year: year.toString(),
          history: index <= indexOf2023 ? apiData.predictions[year] : null,
          predict: index >= indexOf2023 ? apiData.predictions[year] : null
        };
      });
      console.log("Generated Chart Data:", newChartData);
      setChartData(newChartData);
    }
  }, [apiData, years]);


  // //获取街景的缩略图显示
  // const [panoramaUrl, setPanoramaUrl] = useState(null);

  // useEffect(() => {
  //   if (center.lat && center.lng) {
  //     const panoramaUrl = `https://maps.googleapis.com/maps/api/streetview?size=320x190&location=${center.lat},${center.lng}&key=${GOOGLE_API_KEY}`;      // 设置街景图片的URL
  //     setPanoramaUrl(panoramaUrl);
  //   }
  // }, [center]);


  // 获取街景的缩略图显示
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [panoramaUrls, setPanoramaUrls] = useState([]); // 假设您有一个方法来设置这些URLs


  useEffect(() => {
    if (center.lat && center.lng) {
      const basePanoramaUrl = `https://maps.googleapis.com/maps/api/streetview?size=380x230&location=`;

      // 主要的缩略图地址
      const mainPanorama = `${basePanoramaUrl}${center.lat},${center.lng}&key=${GOOGLE_API_KEY}`;

      // 动态生成偏移量，这里假设范围为0.01经纬度单位，你可以根据需要调整这个数值
      const randomOffset = () => (Math.random() * 0.02 - 0.01);

      // 动态生成其他两个地址的经纬度
      const anotherLat1 = center.lat + randomOffset();
      const anotherLng1 = center.lng + randomOffset();
      const anotherLat2 = center.lat + randomOffset();
      const anotherLng2 = center.lng + randomOffset();

      const anotherPanorama1 = `${basePanoramaUrl}${anotherLat1},${anotherLng1}&key=${GOOGLE_API_KEY}`;
      const anotherPanorama2 = `${basePanoramaUrl}${anotherLat2},${anotherLng2}&key=${GOOGLE_API_KEY}`;

      setPanoramaUrls([mainPanorama, anotherPanorama1, anotherPanorama2]);
    }



  }, [center]);


  const [properties, setProperties] = useState([]);


  useEffect(() => {
    if (property && property.property_id) {
      const url = `https://www.huanself.top/transaction/recommendation?property_id=${property.property_id}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setProperties(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [property]);






  return (
    <>
      <NavBar />

      <div className="card-title">
        {formattedAddress}
      </div>

      <div className="card">
        <div className="filter-buttons">
          <button className="button" onClick={() => handleButtonClick([2019, 2020, 2021, 2022, 2023, 2024, 2025])}>7 year</button>
          <button className="button" onClick={() => handleButtonClick([2007, 2010, 2013, 2016, 2019, 2023, 2025])}>14 year</button>
          <button className="button" onClick={() => handleButtonClick([2001, 2006, 2011, 2014, 2018, 2023, 2026])}>26 year</button>
          <button className="button" onClick={() => handleButtonClick([])}>Suburb</button>
        </div>


        <div className="chart-section" ref={cardDivRef}>
          <LineCharts width={chartWidth} height={chartHeight} data={chartData} />
        </div>

        <div className="details-section">
          <div className="details-left">
            {property ? (
              <>

                {/*<div className="details-item">
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
                </div> */}


                <div className="details-item">
                  <span className="detail-key" style={{ fontSize: '22px' }}>
                    {property.zoning === 'R1' ? 'High Density Property' :
                      property.zoning === 'R2' ? 'Medium Density Property' :
                        'Low Density Property'}
                  </span>
                </div>
                <div className="details-item">
                  <span className="detail-key" style={{ fontSize: '16px', color: 'rgb(134, 134, 134)' }}>
                    {property.zoning === 'R1' ? 'This means less greenery and more noise.' :
                      property.zoning === 'R2' ? 'This means moderate greenery and noise.' :
                        'This means more greenery and less noise pollution.'}
                  </span>
                </div>
                <div className="details-item">
                  <span className="detail-key" style={{ fontSize: '22px' }}>
                    {property.area} m² living area
                  </span>
                </div>
                <div className="details-item">
                  <span className="detail-key" style={{ fontSize: '16px', color: 'rgb(134, 134, 134)' }}><lighter>
                    {parseFloat(property.area) > 1000 ? '超大房子qaq' :
                      parseFloat(property.area) >= 400 ? 'Comfortable house-size with plenty of room for family to enjoy afternoons.' :
                        'Plenty of room for a family for daily living and enjoying'}
                  </lighter></span>
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
                  <td>{lowValue}</td>
                  <td className="special-price">{midValue}</td>
                  <td>{highValue}</td>
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
          <Marker
            position={center}
            zIndex={2000}
            icon={markerIconUrl} />

          {/* //使用谷歌地图的地点标记图标。
            <Marker
              position={center}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // 使用Google提供的红色标记图标
                scaledSize: new window.google.maps.Size(80, 80) // 调整图标的大小
              }}
            /> */}
        </GoogleMap>

        <div className="map-button">
          <a href={`https://www.google.com/maps/?q=${center.lat},${center.lng}`} target="_blank" rel="noopener noreferrer">Open on Map</a>
        </div>
      </div>

      {/* 街景缩略图 */}
      <div className="card-streetView-container">
        {properties.map((property, index) => (
          <div
            key={index}
            className={`card-streetView ${index === 0 ? 'current-prediction' : 'recommended-prediction'}`} //给第一个和后两个div分配不同的“类名”来区别当前和推荐的预测目标
            onClick={() => handleSearch(property)} // 在这里添加点击事件处理器
          >
            <img src={property.street_view_url} alt="Street View" />
            <div className="card-streetView-text">
              {property ? (
                <>
                  <p>
                    {property.house_number} {property.street_name}
                  </p>
                  <p>
                    {property.property_locality} NSW {property.post_code}
                  </p>
                  <p>
                    Area: {property.area} m²
                  </p>
                  <p>
                    Prediction: {formatPrediction(property.prediction)}
                  </p>
                </>
              ) : '???'}
            </div>
          </div>
        ))}
      </div>

      {/* 历史交易卡片 */}
      <div className="page-header">
        <h1 id="timeline">History Transaction Timeline</h1>
      </div>

      <div className="card-hstryTranzac">
        <ul className="timeline">
          {/* 使用 historyData 来动态生成历史交易列表 */}
          {historyData && historyData.map((item, index) => (
            <li key={item.dealing_number} className={index % 2 === 0 ? "" : "timeline-inverted"}>
              <div className="timeline-badge">
                {React.createElement(icons[Math.min(index, icons.length - 1)])}
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">{formatDate(item.year_sold)}</h4>  {/* 这里调用了格式化日期的函数 */}
                  <p><small className="text-muted">
                    <big>Property was sold by <big className='enlarge_price'>${item.purchase_price}</big></big>
                  </small></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />

    </>
  );
};

export default PropertyResult;
