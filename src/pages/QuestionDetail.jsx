import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, Avatar, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactHtmlParser from 'react-html-parser';
import { useTheme } from '@mui/system';
import Rating from '@mui/lab/Rating';
import { styled, keyframes } from '@mui/system';
import questionsJson from '../dummy/questions.json';
import answersJson from '../dummy/answers.json';

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
    answerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
    },
    rating: {
        marginLeft: '0.5rem',
    },
});
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedPaper = styled(Paper)`
  animation: ${fadeIn} 1s ease-in;
`;

const QuestionDetail = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = questionsJson
                setQuestion(response[id].items);
                console.log(response[id].items);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAnswers = async () => {
            try {
                const response = answersJson
                setAnswers(response[id].items);
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

    const transformCodeBlock = (node, index) => {
        if (node.type === 'tag' && node.name === 'code') {
            const languageClass = node.attribs && node.attribs.class ? node.attribs.class : 'language-javascript';
            const language = languageClass.split('-')[1] || 'javascript';
            const code = node.children[0].data;
            return (
                <SyntaxHighlighter key={index} language={language} style={docco}>
                    {code}
                </SyntaxHighlighter>
            );
        }
    };


    return (
        <Container className={classes.container}>
            {question ? (
                <>
                    <Typography variant="h4" className={classes.title}>{question.title}</Typography>
                    <AnimatedPaper elevation={1} sx={{ padding: '1rem' }}>
                        <Box className={classes.content}>{ReactHtmlParser(question.body, { transform: transformCodeBlock })}</Box>
                        <Typography variant="body2">작성자: {question.owner?.display_name}</Typography>
                        <Typography variant="body2">작성 날짜: {formatDate(question.creation_date)}</Typography>
                        <Box className={classes.answerContainer}>
                            {question.tags && question.tags.map((tag) => (
                                <li key={tag}>
                                    <Chip label={tag} className={classes.chip} />
                                </li>
                            ))}
                        </Box>
                    </AnimatedPaper>
                    <Typography variant="h5" className={classes.title}>답변</Typography>
                    <Box className={classes.answerContainer}>
                        {answers.map((answer) => (
                            <AnimatedPaper key={answer.answer_id} className={classes.answer} elevation={1}>
                                <Box className={classes.answerHeader}>
                                    <Typography variant="body2">작성자: {answer.owner?.display_name}</Typography>
                                    <Typography variant="body2">작성 날짜: {formatDate(answer.creation_date)}</Typography>
                                    <Rating className={classes.rating} value={Math.floor(Math.random() * 5) + 1} readOnly />
                                </Box>
                                <Divider />
                                <Box className={classes.content} sx={{ padding: '1rem' }}>
                                    {ReactHtmlParser(answer.body, { transform: transformCodeBlock })}
                                </Box>
                            </AnimatedPaper>
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
