import "./NewPoll.scss";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";
import {AnswerTextarea} from "./AnswerTextarea";
import {ConfirmationPoll} from "./ConformationPoll/ConfirmationPoll";
import {ModalWindowNotification} from "../../../components/ModalWindowNotification/ModalWindowNotification";

export const NewPoll = () => {

    //topics from db
    const [topics, setTopics] = useState(null);

    const currentUser = useContext(AuthContext);

    //data from fields
    const [question, setQuestion] = useState("");
    //answers
    const [answersData, setAnswersData] = useState([
        {
            id: 0,
            answer: "",
            error: "Відповіді не можуть бути пустими",
            e: null
        },
        {
            id: 1,
            answer: "",
            error: "Відповіді не можуть бути пустими",
            e: null
        }
    ]);
    // topic id
    const [topicId, setTopicId] = useState(3);
    //result poll
    const [resultPoll, setResultPoll] = useState({
        question: "",
        answers: "",
        topicId: topicId,
        userId: currentUser.currentUser.id
    });

    ///////////////////////////////////////////////////////////////////////////////////
    //validation
    const [questionDirty, setQuestionDirty] = useState(false);
    const [questionError, setQuestionError] = useState("Запитання не може бути пустим!");
    const [answersError, setAnswersError] = useState("Помилка");
    const [isValid, setIsValid] = useState(false);


    // is valid all
    useEffect(() => {

        if (questionError || answersError) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }

    }, [questionError, answersError]);

    // set error answers
    useEffect(() => {
        let error = "";
        answersData.forEach((answer) => {
            if (answer.error) {
                error = answer.error;
            }
        });
        setAnswersError(error);

    }, [answersData]);

    const handleBlurQuestion = () => {
        setQuestionDirty(true);
    };

    //get topic id
    const handleGetTopic = (e) => {
        setTopicId(Number(e.target.value));
    }

    // get question
    const handleChangeQuestion = (e) => {
        setQuestion(e.target.value);
        if (e.target.value.length) {
            setQuestionError("");
        } else {
            setQuestionError("Запитання не може бути пустим!");
        }
    };

    // get an error from the answer
    const getErrorAnswer = useCallback((id, errorAnswer) => {
        setAnswersData(prevState =>
            prevState.map(item => {
                if (item.id === id) {
                    return {...item, error: errorAnswer};
                } else {
                    return item;
                }
            })
        )
    }, []);

    // get answers
    function changeAnswers(id, event) {
        setAnswersData(prevState =>
            prevState.map(item => {
                if (item.id === id) {
                    return {...item, answer: event.target.value, e: event};
                } else {
                    return item;
                }
            })
        )
    }

    // get topics from db
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

    // add the new component textarea
    const handleAddAnswer = (e) => {
        e.preventDefault();
        setAnswersData(prev => [...prev, {
            id: answersData.length,
            answer: "",
            error: "Відповіді не можуть бути пустими",
            e: null
        }])

    };

    // delete the component textarea
    const handleDeleteAnswer = (e) => {
        e.preventDefault();
        if (answersData.length > 2) {
            setAnswersData(prev => prev.slice(0, prev.length - 1));
        }
    }

    // make the end result
    const editResultPoll = () => {
        // string with answers separated by #
        let answersString = "";
        answersData.forEach((answer) => {
            answersString += answer.answer + "#";
        });
        setResultPoll(prev => ({...prev, question: question, answers: answersString, topicId: topicId}));
    };
    useEffect(editResultPoll, [question, answersData, topicId]);

    // check poll
    const [isClickedSend, setIsClickedSend] = useState(false);
    const handleSendForm = (e) => {
        e.preventDefault();
        setIsClickedSend(true);
    };

    ///////////////////////////////////////////////////////////////////////////////////
    // close the modal window
    const closeModal = () => {
        setIsClickedSend(prev => !prev);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    // clean up the form

    // ref to the question textarea
    const refQuestion = useRef(null);

    //trigger to change the value if the button was pressed
    const [isClicked, setIsClicked] = useState(false);

    const clean = () => {
        setAnswersData(prev => {
            const newData = prev.slice(0, 2);
            newData.forEach((answer) => {
                answer.error = "Відповіді не можуть бути пустими";
                answer.e.target.value = '';
                answer.answer = '';
            });
            return newData;
        });
        refQuestion.current.value = '';
        setQuestionDirty(false);
        setQuestionError("Запитання не може бути пустим!");
        setIsClicked(prev => !prev);
    };

    ///////////////////////////////////////////////////////////////////////////////////
    // show result window
    const [isSendBD, setIsSendBD] = useState(false);
    const [messageRes, setMessageRes] = useState("");
    const showModalWindowNotification = (message) => {
        setIsSendBD(true);
        setTimeout(() => {
            setIsSendBD(false);
        }, 3000);
        setMessageRes(message);
    };
    return (
        <>
            <div className="form-add-poll">
                <form>
                    <p className="item-text">Додайте запитання</p>
                    {(questionDirty && questionError) && <p className="error">{questionError}</p>}
                    <textarea
                        className={(questionDirty && questionError) ? ["textarea-question", "error-input"].join(" ") : "textarea-question"}
                        onChange={handleChangeQuestion}
                        onBlur={handleBlurQuestion}
                        placeholder="Запитання..."
                        ref={refQuestion}
                    ></textarea>
                    <p className="item-text">Додайте відповіді для опитування (мінімум 2)<br/>
                        Кожне питання записуйте в окремому вікні!</p>
                    <div className="answers">
                        {
                            answersData.map(answer => {
                                return (
                                    <AnswerTextarea
                                        key={answer.id}
                                        id={answer.id}
                                        changeAnswers={changeAnswers}
                                        getErrorAnswer={getErrorAnswer}
                                        isClicked={isClicked}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className="buttons-answer">
                        <button className="button-answer" onClick={handleAddAnswer}>+</button>
                        <button className="button-answer" onClick={handleDeleteAnswer}>-</button>
                    </div>
                    <p className="item-text">Оберіть тематику вашого опитування</p>
                    <select className="basic-select" onChange={handleGetTopic}>
                        {topics && topics.map((topic) => {
                            return (
                                <option
                                    key={topic.id}
                                    value={topic.id.toString()}
                                >
                                    {topic.name}
                                </option>
                            );
                        })}
                    </select>
                    <button disabled={!isValid} className="button-form" onClick={handleSendForm}>Додати</button>
                </form>
            </div>
            {isClickedSend &&
                <ConfirmationPoll
                    closeModal={closeModal}
                    poll={resultPoll}
                    clean={clean}
                    showModalWindowNotification={showModalWindowNotification}
                />
            }
            {isSendBD &&
                <ModalWindowNotification message={messageRes}/>
            }
        </>
    );
};