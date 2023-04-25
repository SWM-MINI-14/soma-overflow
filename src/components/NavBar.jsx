// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Logo from '../assets/smoverflow_horizontal.png';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const NavBar = ({user, setUser}) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/" className={classes.link}>
                        <img alt={'logo'} src={Logo} style={{maxHeight: '50px', maxWidth: '150px'}} />
                    </Link>
                </Typography>
                {
                    user ? (
                        <>
                            {user.username}
                            <Button onPress={setUser(null)}>로그아웃</Button>
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
