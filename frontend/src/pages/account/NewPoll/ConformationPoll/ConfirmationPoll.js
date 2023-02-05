import "./ConfirmationPoll.scss";
import axios from "axios";
import {useEffect, useState} from "react";

export const ConfirmationPoll = (props) => {

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setAnswers(() => {
            let answers = props.poll.answers.split("#");
            answers.length--;
            return answers;
        });
    }, [props.poll]);

    const clickGoBack = (e) => {
        e.preventDefault();
        props.closeModal();
    };
    const clickSendData = async (e) => {
        e.preventDefault();
        //send the form to the server
        try {
            const res = await axios.post("/polls/addPoll", props.poll);
            props.showModalWindowNotification(res.data);
        } catch (error) {
            props.showModalWindowNotification(error);
        }
        props.closeModal();
        props.clean();
    };
    return (
        <>
            <div className="content-confirmation-window">
                <div className="confirmation-window">
                    <span className="main-text-modal">Ваше опитування буде мати такий вигляд:</span>
                    <hr className="line"/>
                    <div className="modal-content">
                        <p className="question-modal">{props.poll.question}</p>
                        {answers.map((answer, index) => {
                            return <p key={index} className="answer-modal">{index + 1 + ". " + answer}</p>
                        })}
                    </div>
                    <hr className="line"/>
                    <div className="buttons-block-modal">
                        <button className="button-goBack" onClick={clickGoBack}>Змінити</button>
                        <button className="buttonSend" onClick={clickSendData}>Додати</button>
                    </div>
                </div>
            </div>
        </>
    );
};