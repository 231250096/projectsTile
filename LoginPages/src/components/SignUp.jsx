import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // 引入对应的CSS文件

const SignUp = () => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 这里可以添加验证逻辑
    if (!agreed) {
      alert('请勾选同意条款');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, email, password }),
    });

    if (response.ok) {
      alert('注册成功！');
      // 这里可以重定向到登录页面
      window.location.href = './LoginPage.html';
    } else {
      alert('注册失败，请检查您的输入或稍后再试。');
    }
  };

  return (
    <div> {/* 添加一个 div 作为所有 JSX 子元素的父元素 */}
      <div className="blob"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Join Us</h2>
          <div className="input-box">
            <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
            <input
              type="text"
              required
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <label>账号</label>
          </div>
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
          <div className="input-box">
            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>密码</label>
          </div>
          <div className="remeber-forgot">
            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              /> 我同意所有条款
            </label>
          </div>
          <button type="submit">注册按钮</button>
          <div className="register-link">
            <p>已有账号? <Link to="/login">点击登录</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;