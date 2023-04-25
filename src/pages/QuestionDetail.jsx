import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, Avatar, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
});


const QuestionDetail = () => {
    const classes = useStyles();
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
                    <Paper elevation={1} sx={{ padding: '1rem' }}>
                        <Box className={classes.content}>{ReactHtmlParser(question.body, { transform: transformCodeBlock })}</Box>
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
                                <Box className={classes.answerHeader}>
                                    <Typography variant="body2">작성자: {answer.owner.display_name}</Typography>
                                    <Typography variant="body2">작성 날짜: {formatDate(answer.creation_date)}</Typography>
                                </Box>
                                <Divider />
                                <Box className={classes.content} sx={{ padding: '1rem' }}>
                                    {ReactHtmlParser(answer.body, { transform: transformCodeBlock })}
                                </Box>
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
