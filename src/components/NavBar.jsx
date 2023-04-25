// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Logo from '../assets/smoverflow_horizontal.png';
import {postLogout} from "../apis/apiServices.js";

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    username: {
        marginRight: '1rem',
    },
    logoutButton: {
        marginRight: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
        },
    },
});

const NavBar = ({user, setUser}) => {
    const classes = useStyles();

    const handleLogout = async () => {
        try {
            const response = await postLogout();
            if (response.status === 200) {
                setUser(null);
                localStorage.removeItem('user')
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.link}>
                        <img alt={'logo'} src={Logo} style={{maxHeight: '50px', maxWidth: '150px'}} />
                    </Link>
                </Typography>
                {
                    user!==null ? (
                        <>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" className={classes.username}>{user.username}</Typography>
                                <Button onClick={handleLogout} variant={"contained"} className={classes.logoutButton}>로그아웃</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={classes.link}>
                                <Button color="inherit">로그인</Button>
                            </Link>
                            <Link to="/signup" className={classes.link}>
                                <Button color="inherit">회원가입</Button>
                            </Link>
                        </>
                    )
                }

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
