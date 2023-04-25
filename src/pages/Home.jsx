// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.stackexchange.com/2.2/questions?site=stackoverflow");
                setQuestions(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>질문 목록</h1>
            <ul>
                {questions.map(question => (
                    <li key={question.question_id}>
                        <a href={`/questions/${question.question_id}`}>{question.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
