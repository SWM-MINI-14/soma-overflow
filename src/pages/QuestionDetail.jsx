// src/pages/QuestionDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    return (
        <div>
            {question ? (
                <>
                    <h1>{question.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: question.body }} />
                    <p>작성자: {question.owner.display_name}</p>
                    <p>작성 날짜: {formatDate(question.creation_date)}</p>
                    <p>태그: {question.tags.join(', ')}</p>
                    <h2>답변</h2>
                    <ul>
                        {answers.map((answer) => (
                            <li key={answer.answer_id}>
                                <div dangerouslySetInnerHTML={{ __html: answer.body }} />
                                <p>작성자: {answer.owner.display_name}</p>
                                <p>작성 날짜: {formatDate(answer.creation_date)}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default QuestionDetail;
