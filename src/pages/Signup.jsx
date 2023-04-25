import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import {postSignup, postLogin} from "../apis/apiServices.js";

const Signup = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postSignup({body: {username: username, password: password}});
            if (response.status === 201) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                setUser(response.data.data);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error)
                setErrorMessage(JSON.stringify(error.response.data));
            } else {
                setErrorMessage('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center">
                    회원가입
                </Typography>
                <Typography variant="subtitle2" align="center">
                    빠른회원가입을 위해 비밀번호는 8자 이상이기만 하면됩니다.
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
                    회원가입
                </Button>
            </form>
        </Container>
    );
};

export default Signup;
