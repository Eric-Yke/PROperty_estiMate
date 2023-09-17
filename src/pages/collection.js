import React, { useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { AiOutlineStar } from "react-icons/ai";
import './collection.css';  // 你可以创建一个 Collection.css 文件来添加样式

const Collection = () => {
  const GOOGLE_API_KEY = 'AIzaSyBUOPk08ZvqOMMQYv_FffgYgIhbec-QVuk';  // 请在这里填写你的 Google API 密钥
  const center = { lat: 40.7128, lng: -74.0060 };  // 这是一个示例经纬度，你可以根据需要更改

  useEffect(() => {
    if (center.lat && center.lng) {
      const basePanoramaUrl = `https://maps.googleapis.com/maps/api/streetview?size=280x130&location=`;
      const mainPanorama = `${basePanoramaUrl}${center.lat},${center.lng}&key=${GOOGLE_API_KEY}`;
      // 你可以使用 mainPanorama URL 来显示街景缩略图
    }
  }, [center]);

  return (
    <div>
      <NavBar />
      <div className="collection-page">
        <h1>My Collections</h1>
        <div className="card-container">
          {/* 这里是一个示例卡片，你可以根据需要添加更多卡片 */}
          <div className="card">
            {/* <img src="STREET_VIEW_IMAGE_URL" alt="Street View" className="street-view-img" />  街景缩略图 */}
            <img src="../images/background.jpg" className='street-view-img' />
            <div className="card-info">
              <div className="card-header">
                <h2>$1,000,000</h2>  {/* 预测价格 */}
                <div className='icons_star' style={{ alignSelf: 'flex-end', color: 'gold' }}>
                  <AiOutlineStar size={28} />
                </div>
              </div>
              <div className="card-address">123 Main St, City, State</div>  {/* 详细地址 */}
            </div>
          </div>
          <div className="card">
            {/* <img src="STREET_VIEW_IMAGE_URL" alt="Street View" className="street-view-img" />  街景缩略图 */}
            <img src="../images/background.jpg" className='street-view-img' />
            <div className="card-info">
              <div className="card-header">
                <h2>$1,000,000</h2>  {/* 预测价格 */}
                <div className='icons_star' style={{ alignSelf: 'flex-end', color: 'gold' }}>
                  <AiOutlineStar size={28} />
                </div>
              </div>
              <div className="card-address">123 Main St, City, State</div>  {/* 详细地址 */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Collection;

