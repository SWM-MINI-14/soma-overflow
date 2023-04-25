// src/pages/Login.jsx
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 요청을 서버에 보내고 응답을 처리하는 코드를 작성하세요.
    };

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
