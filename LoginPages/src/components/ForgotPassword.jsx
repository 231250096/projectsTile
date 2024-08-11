import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // 引入对应的CSS文件

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 这里可以添加验证逻辑
    if (!email) {
      alert('请输入您的邮箱');
      return;
    }

    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert('邮件已发送，请查收!');
      // 可以重定向到登录页面
      window.location.href = './LoginPage.html';
    } else {
      alert('发送失败，请检查您的邮箱或稍后再试。');
    }
  };

  return (
    <div> {/* 添加一个 div 作为所有 JSX 子元素的父元素 */}
      <div className="blob"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Find It</h2>
          <div className="input-box">
            <span className="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>邮箱</label>
          </div>
          <div className="remeber-forgot">
            <label>
              <input type="checkbox" /> 确保邮箱正确!
            </label>
          </div>
          <button type="submit">发送邮件</button>
          <div className="register-link">
            <p>还没有账号? <Link to="/signup">点击注册</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;