// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.link}>StackOverflow Clone</Link>
                </Typography>
                <Link to="/login" className={classes.link}>
                    <Button color="inherit">로그인</Button>
                </Link>
                <Link to="/signup" className={classes.link}>
                    <Button color="inherit">회원가입</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
