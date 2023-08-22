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
