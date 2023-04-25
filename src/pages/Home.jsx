import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { identiconSvg } from 'https://cdn.jsdelivr.net/npm/minidenticons@3.1.2/minidenticons.min.js'
import listJson from '../dummy/list.json';
import ScrollTrigger from 'react-scroll-trigger';

const useStyles = makeStyles({
    container: {
        marginTop: '2rem',
    },
    title: {
        marginBottom: '1rem',
    },
    listItem: {
        marginBottom: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        opacity: 0,
        transform: 'translateY(50px)',
        transition: 'opacity 1s ease, transform 1s ease',
    },
    triggered: { // triggered 클래스 정의
        opacity: 1,
        transform: 'translateY(0)',
    },
});

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [triggered, setTriggered] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questions/`);
                setQuestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const onEnterViewport = () => {
        setTriggered(true);
    }

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.title}>질문 목록</Typography>
            <List>
                {questions.map((question, idx) => (
                    <ScrollTrigger key={question.id} onEnter={onEnterViewport}>
                        <ListItem
                            className={`${classes.listItem} ${triggered ? classes.triggered : ''}`}
                            component="a"
                            href={`/questions/${question.id}`}
                            alignItems="flex-start"
                        >
                            <ListItemAvatar style={{marginTop: '0'}}>
                                <identicon-svg style={{marginRight: '10'}} username={question.owner.display_name}></identicon-svg>
                            </ListItemAvatar>
                            <ListItemText primary={question.title} secondary={`작성자: ${question.owner.display_name}`} />
                        </ListItem>
                    </ScrollTrigger>
                ))}
            </List>
        </Container>
    );
};

export default Home;
