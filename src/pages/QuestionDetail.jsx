// src/pages/QuestionDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionDetail = ({ match }) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.stackexchange.com/2.2/questions/${match.params.id}?site=stackoverflow&filter=withbody`);
                setQuestion(response.data.items[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [match.params.id]);

    return (
        <div>
            {question ? (
                <>
                    <h1>{question.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: question.body }} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default QuestionDetail;
