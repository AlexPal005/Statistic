import {useState} from "react";
import './PollCard.scss';
import axios from "axios";

export const PollCard = ({poll, updateDataIfAdminCheckedPoll}) => {
    const [answers] = useState(poll.answers);

    function sendIsAllowed(url, isAllowed) {
        axios.post(url, {
            isAllowed: isAllowed,
            pollId: poll.poll_id
        })
            .catch(err => {
                console.error(err);
            })
        updateDataIfAdminCheckedPoll();
    }

    const refuseHandleClick = () => {
        sendIsAllowed('/admin/setIsAllowed', false);
    }
    const goodHandleClick = () => {
        sendIsAllowed('/admin/setIsAllowed', true);
    }
    return (
        <div className='card'>
             <span className="grey-data-card">
                Створено {new Date(poll.date_creation).toLocaleDateString()} {poll.nick_name}
            </span>
            <p className="card-question">{poll.question}</p>
            <span className="grey-data-card">{poll.totalCountVotes} голосів</span>
            <hr/>
            {answers.map((answer) => {
                return (
                    <div className="answer-main" key={answer.answer_id}>
                        <span className="text-answer">{answer.answer}</span>
                    </div>
                );
            })}
            <div className='block-admin-buttons-card'>
                <button
                    className="button-goBack"
                    onClick={refuseHandleClick}
                >
                    Відмовити
                </button>
                <button
                    className="buttonSend"
                    onClick={goodHandleClick}
                >
                    ОК
                </button>
            </div>
        </div>
    );
};