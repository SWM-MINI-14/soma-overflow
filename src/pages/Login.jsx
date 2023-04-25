import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import {postLogin} from "../apis/apiServices.js";

const Login = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postLogin({body: {username: username, password: password}});
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                setUser(response.data.data);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('로그인 실패: 사용자 이름 또는 비밀번호가 올바르지 않습니다.');
            } else {
                setErrorMessage('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center">
                    로그인
                </Typography>
            </Box>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="사용자 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    로그인
                </Button>
            </form>
        </Container>
    );
};

export default Login;
