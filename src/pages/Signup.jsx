// src/pages/Signup.jsx
import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 요청을 서버에 보내고 응답을 처리하는 코드를 작성하세요.
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    사용자 이름:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
