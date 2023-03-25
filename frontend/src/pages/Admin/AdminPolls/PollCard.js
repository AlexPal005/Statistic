import {useState} from "react";
import './PollCard.scss';

export const PollCard = ({poll}) => {
    const [answers] = useState(poll.answers);

    const refuseHandleClick = () => {

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
                <button className="buttonSend">ОК</button>
            </div>
        </div>
    );
};