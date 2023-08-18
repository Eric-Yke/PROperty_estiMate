//Appp.js的路径：/Users/cei/newFolder/PROperty_estiMate/src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyResult from './pages/PropertyResult';
import Login from './pages/Login';  // 引入 Login


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propertyResult" element={<PropertyResult />} />
        <Route path="/login" element={<Login />} /> {/* // 添加路由到 /login */}

      </Routes>
    </Router>
  );
}

export default App;



// export default App;
// import React from 'react';
// import NavBar from './components/NavBar/NavBar';
// import Search from './components/Search/Search';
// import Content from './components/Content/Content';
// import Footer from './components/Footer/Footer';
// import ChatBox from './components/ChatBox/ChatBox';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <Search />
//       <Content />
//       <Footer />
//       <ChatBox />
//     </div>
//   );
// }

// export default App;
