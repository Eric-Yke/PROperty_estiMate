//使用行内样式后的代码
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




























//////=================================================== 1.0 =======================================================================

////基础的代码的样式：
// import React from 'react';
// import Footer from '../components/Footer/Footer';


// const PropertyResult = () => {
//   return (
//     <>
//       <div name="bigSquare" style={{ backgroundColor: "#f3f1ea" }}>
//         <div id="container1">
//           <div id="sub_conta1" style={{ backgroundColor: "#ebcab9", borderRadius: "15%" }}>Bedroom in house</div>
//           <div id="sub_conta2" style={{ backgroundColor: "#e1d3c9", borderRadius: "15%" }}>Garage in house</div>
//           <div id="sub_conta3" style={{ backgroundColor: "#c1d3d8", borderRadius: "15%" }}>Bathroom in house</div>
//         </div>
//         <div id="container2">
//           <h3>Unit 4 70 Rowland Ave, Wollongong 2500 NSW</h3>
//           <div >
//             <div id="sub_conta4">折线图</div>
//             <div id="sub_conta5">筛选选项</div>
//           </div>
//           <button>Open on map</button>

//         </div>
//       </div>
//       <div style={{ backgroundColor: "#fbf8ed" }}>
//         <div style={{ backgroundColor: "#ffffff" }}>此处应放置更多的信息和细节</div>
//       </div>
//       <Footer />

//     </>
//   );
// };

// export default PropertyResult;

////=================================================== 2.0 =======================================================================
