import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, Avatar, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: {
        marginTop: '2rem',
    },
    title: {
        marginBottom: '1rem',
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    chip: {
        margin: '0.5rem',
    },
    answerContainer: {
        marginTop: '2rem',
    },
    answer: {
        padding: '1rem',
        marginBottom: '1rem',
    },
    content: {
        fontSize: '16px',
        whiteSpace: 'pre-wrap',
        '& img': {
            maxWidth: '100%',
            height: 'auto',
        },
    },
});


const QuestionDetail = () => {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow&filter=withbody`);
                setQuestion(response.data.items[0]);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`https://api.stackexchange.com/2.2/questions/${id}/answers?site=stackoverflow&filter=withbody`);
                setAnswers(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestion();
        fetchAnswers();
    }, [id]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString();
    };


    const classes = useStyles();

    return (
        <Container className={classes.container}>
            {question ? (
                <>
                    <Typography variant="h4" className={classes.title}>{question.title}</Typography>
                    <Paper elevation={1} sx={{ padding: '1rem' }}>
                        <Box className={classes.content} dangerouslySetInnerHTML={{ __html: question.body }} />
                        <Typography variant="body2">작성자: {question.owner.display_name}</Typography>
                        <Typography variant="body2">작성 날짜: {formatDate(question.creation_date)}</Typography>
                        <Box className={classes.answerContainer}>
                            {question.tags.map((tag) => (
                                <li key={tag}>
                                    <Chip label={tag} className={classes.chip} />
                                </li>
                            ))}
                        </Box>
                    </Paper>
                    <Typography variant="h5" className={classes.title}>답변</Typography>
                    <Box className={classes.answerContainer}>
                        {answers.map((answer) => (
                            <Paper key={answer.answer_id} className={classes.answer} elevation={1}>
                                <Box className={classes.content} dangerouslySetInnerHTML={{ __html: answer.body }} />
                                <Divider sx={{ marginY: '0.5rem' }} />
                                <Box display="flex" alignItems="center">
                                    <Avatar src={answer.owner.profile_image} sx={{ marginRight: '0.5rem' }} />
                                    <Typography variant="body2">작성자: {answer.owner.display_name}</Typography>
                                </Box>
                                <Typography variant="body2">작성 날짜: {formatDate(answer.creation_date)}</Typography>
                            </Paper>
                        ))}
                    </Box>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default QuestionDetail;
