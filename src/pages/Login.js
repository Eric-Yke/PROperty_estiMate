
import React from 'react';
import './Login.css';  // 引入 CSS 文件

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login Page</h1>

      <div className="form-container">
        {/* 注册表单 */}
        <div className="form-section">
          <h2>Register</h2>
          <form>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <input type="submit" value="Register" />
          </form>
        </div>

        {/* 登录表单 */}
        <div className="form-section">
          <h2>Login</h2>
          <form>
            <label>
              Username or Email:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
