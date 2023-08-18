import React, { useState } from 'react';
import './Login.css';
import logo from '/Users/cei/newFolder/PROperty_estiMate/src/images/logo.png'; // 引入LOGO图片
import { useNavigate } from 'react-router-dom';  // 引入useNavigate


const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // 用于切换登录和注册表单
  const navigate = useNavigate();  // 使用useNavigate钩子

  const handleLogin = (event) => {
    event.preventDefault();  // 阻止表单的默认提交行为
    // 这里可以加入登录验证的代码

    // 如果登录成功，跳转到 Home 页面
    navigate('/');
  };

  const handleRegister = (event) => {
    event.preventDefault();  // 阻止表单的默认提交行为
    // 这里可以加入注册验证的代码

    // 如果注册成功，切换回登录界面
    setIsLogin(true);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="div2">
          <div className="div2-left">
            <img src={logo} alt="Logo" className="logo-image" />
            <p>测试文字测试文字</p>
          </div>
          <div className="div2-right">
            {isLogin ? (
              <div>
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                  <label>
                    Username:
                    <input type="text" name="username" placeholder="Username" />
                  </label>
                  <label>
                    Password:
                    <input type="password" name="password" placeholder="Password" />
                  </label>
                  <input type="submit" value="Login" />
                  <p onClick={() => setIsLogin(false)}>Don't have an account? Sign up!</p>
                </form>
              </div>
            ) : (
              <div>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <label>
                    Username:
                    <input type="text" name="username" placeholder="Username" />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" placeholder="Email address" />
                  </label>
                  <label>
                    Password:
                    <input type="password" name="password" placeholder="Password" />
                  </label>
                  <input type="submit" value="Register" onClick={() => setIsLogin(true)} />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
