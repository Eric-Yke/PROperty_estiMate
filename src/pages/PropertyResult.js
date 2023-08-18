// import React from 'react';
// import NavBar from '../components/NavBar/NavBar';
// import Footer from '../components/Footer/Footer';
// import LineCharts from '../components/LineCharts/LineCharts'; // 引入LineCharts组件
// import '../pages/PropertyResult.css';

// const PropertyResult = () => {
//   return (
//     <>
//       <NavBar />
//       <div className="container-main">
//         <div className="top-section">
//           <div className="left-box">
//             <div className="bedroom-info">Bedroom in house</div>
//             <div className="garage-info">Garage in house</div>
//             <div className="bathroom-info">Bathroom in house</div>
//           </div>
//           <div className="right-box">
//             <h3 id="property-title">Unit 4 70 Rowland Ave, Wollongong 2500 NSW</h3>
//             <div className="chart-table-container">
//               <div className="chart-section">
//                 <LineCharts />
//               </div>
//               <div className="table-section">
//                 <table className="info-table">
//                   <tbody>
//                     <tr>
//                       <td className="yearly-cell">Yearly</td>
//                       <td className="monthly-cell">Monthly</td>
//                     </tr>
//                     <tr><td colSpan={2}>Rental</td></tr>
//                     <tr><td colSpan={2}>Suburb Price</td></tr>
//                     <tr><td colSpan={2}>State Price</td></tr>
//                     <tr><td className="filter-cell" colSpan={2}>filter</td></tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="open-map-button">
//               <button>Open on map</button>
//             </div>
//           </div>
//         </div>
//         <div className="bottom-section">
//           <div className="more-info">more inform later..</div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default PropertyResult;















//之前使用行内样式的代码
import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

import LineCharts from '../components/LineCharts/LineCharts'; // 引入LineCharts组件
import '../pages/PropertyResult.css'; // 引入CSS文件


const PropertyResult = () => {
  return (
    <>
      <NavBar />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", width: "90%", backgroundColor: "#f3f1ea", marginTop: "10px" }}>
          <div style={{ flex: 2, backgroundColor: "#ffffff", margin: "10px" }}>

            <div style={{
              backgroundColor: "#ebcab9",
              color: 'white',
              radius: "15%",
              padding: '10px',
              margin: '5px',
              textAlign: 'center'
            }}>
              Bedroom in house
            </div>
            <div style={{
              backgroundColor: "#e1d3c9",
              color: 'white',
              radius: "15%",
              padding: '10px',
              margin: '5px',
              textAlign: 'center'
            }}>
              Garage in house
            </div>
            <div style={{
              backgroundColor: "#c1d3d8",
              color: 'white',
              radius: "15%",
              padding: '10px',
              margin: '5px',
              textAlign: 'center'
            }}>
              Bathroom in house
            </div>
          </div>
          <div style={{ flex: 8, backgroundColor: "#e1d3c9", margin: "10px" }}>
            <h3 id="property-title">Unit 4 70 Rowland Ave, Wollongong 2500 NSW</h3>

            <div id="conta002" style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
              {/* 折线图 */}
              <div id="lineChart" style={{ flex: 6, padding: '10px', background: 'rgba(255, 255, 255, 0.4)' }}>
                <LineCharts /> {/* 在这里插入LineCharts组件 */}
              </div>

              {/* 表格 */}
              {/* <div id="tableSimple" style={{ flex: 4, padding: '10px' }}> ..</div> */}
              <div id="tableSimple" style={{ flex: 4, padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                <table style={{ borderCollapse: 'collapse', width: '50%', padding: '15px' }}>
                  <tbody>
                    <tr>
                      <td style={{ color: '#8e8e8efb', backgroundColor: '#eeeeeefd', border: '1px solid #ffffff', textAlign: 'center', verticalAlign: 'middle' }}>Yearly</td>
                      <td style={{ color: '#8e8e8efb', backgroundColor: '#f4ecd8fe', border: '1px solid #ffffff', textAlign: 'center', verticalAlign: 'middle' }}>Monthly</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#8e8e8efb', backgroundColor: '#eeeeeefd', border: '1px solid #ffffff', textAlign: 'center', verticalAlign: 'middle' }} colSpan={2}>Rental</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#8e8e8efb', backgroundColor: '#f4ecd8fe', border: '1px solid #ffffff', textAlign: 'center', verticalAlign: 'middle' }} colSpan={2}>Suburb Price</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#8e8e8efb', backgroundColor: '#eeeeeefd', border: '1px solid #ffffff', textAlign: 'center', verticalAlign: 'middle' }} colSpan={2}>State Price</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#ffffff', backgroundColor: '#f1713a', border: '1px', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }} colSpan={2}>filter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>


            <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
              <button>Open on map</button>
            </div>
          </div>
        </div>
        <div style={{ width: "90%", backgroundColor: "#fbf8ed", marginTop: "10px", height: "400px", }}>
          <div style={{ backgroundColor: "#ffffff", margin: "10px", height: "96%" }}>
            more inform later..
          </div>
        </div>
        <Footer />

      </div>
    </>
  );
};

export default PropertyResult;