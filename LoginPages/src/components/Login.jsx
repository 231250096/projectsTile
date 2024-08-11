import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // 引入对应的CSS文件

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        alert('登录成功！');
        // 这里可以重定向到另一个页面，例如主页
        window.location.href = './home.html';
      } else {
        alert('登录失败，请检查您的凭据。');
      }
    } else {
      alert('服务器错误，请稍后再试。');
    }
  };

  return (
    <div> {/* 添加一个 div 作为所有 JSX 子元素的父元素 */}
      <div className="blob"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit} id="loginForm">
          <h2>Welcome To Worktile</h2>
          <div className="input-box">
            <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
            <input
              type="email"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>邮箱或账号</label>
          </div>
          <div className="input-box">
            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>密码</label>
          </div>
          <div className="remeber-forgot">
            <label>
              <input type="checkbox" name="remember" /> 记住密码
              <Link to="/forgot-password">忘记密码?</Link>
            </label>
          </div>
          <button type="submit">登录</button>
          <div className="register-link">
            <p>还没有账号? <Link to="/signup">点击注册</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;