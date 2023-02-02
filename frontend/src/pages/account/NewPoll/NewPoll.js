import "./NewPoll.scss";
import {createElement, useEffect, useState} from "react";
import axios from "axios";

export const NewPoll = () => {
    const [topics, setTopics] = useState(null);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            axios.get("/main/topics")
                .then(response => setTopics(response.data))
                .catch(err => {
                    console.log(err);
                });
        }
        fetchData();
    }, []);
    const handleAddAnswer = (e) => {
        e.preventDefault();
        setAnswers(prev => [...prev, AddAnswer()]);
    };
    const handleDeleteAnswer = (e) => {
        e.preventDefault();
        if (answers.length) {
            setAnswers(prev => prev.slice(0, prev.length - 1));
        }
    }
    const AddAnswer = () => {
        return createElement(
            'div',
            {
                key: answers.length + 3
            },
            createElement(
                'textarea',
                {
                    className: "textarea-answer",
                    defaultValue: answers.length + 3 + "."
                }
            )
        );
    }
    return (
        <div className="basic-form form-add-poll">
            <form>
                <p className="item-text">Додайте запитання</p>
                <textarea className="textarea-question"></textarea>
                <p className="item-text">Додайте відповіді для опитування (мінімум 2)</p>
                <div className="answers">
                    <div className="block-answer">
                        <textarea className="textarea-answer" defaultValue="1. "></textarea>
                    </div>
                    <div className="block-answer">
                        <textarea className="textarea-answer" defaultValue="2. "></textarea>
                    </div>
                    {answers}
                    <div className="buttons-answer">
                        <button className="button-answer" onClick={handleAddAnswer}>+</button>
                        <button className="button-answer" onClick={handleDeleteAnswer}>-</button>
                    </div>
                </div>
                <p className="item-text">Оберіть тематику вашого опитування</p>
                <select className="basic-select">
                    {topics && topics.map((topic) => {
                        return <option key={topic.id}>{topic.name}</option>
                    })}
                </select>
                <button className="button-form">Додати</button>
            </form>
        </div>
    );
};