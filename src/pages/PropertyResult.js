import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import LineCharts from '../components/LineCharts/LineCharts';
import './PropertyResult.css';
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const PropertyResult = () => {
  const location = useLocation();
  const property = location.state ? location.state.property : null;
  const cardDivRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {

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

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <>
      <NavBar />

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
                <p>Area: {property.area}</p>
                <p>Street Name: {property.street_name}</p>
                <p>Locality: {property.property_locality}</p>
                <p>Post Code: {property.post_code}</p>
              </>
            ) : "Address Details Here..."}
          </div>
          <div className="details-right">
            <br ></br>
            <table className="table">
              <thead>
                <tr>
                  <th>LOW</th>
                  <th style={{ fontSize: '1.1em' }}>MID</th>
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
      <div className="card-two">

      </div>

      <Footer />
    </>
  );
};

export default PropertyResult;
