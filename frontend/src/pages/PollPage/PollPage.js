import './PollPage.scss';
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const PollPage = () => {
    const pollId = useParams().pollId;
    const [poll, setPoll] = useState(null);
    const getPoll = useCallback(() => {
        axios.get('/main/getPollById', {params: {pollId: pollId}})
            .then(pollRes => {
                setPoll(pollRes.data[0]);
                console.log(pollRes.data[0]);
            })
            .catch(err => {
                console.error(err);
            })
    }, [poll]);

    useEffect(() => {
        getPoll();
    }, []);

    return (
        <div className='content-my-polls'>
            {poll ?
                <>
                    <h1>{poll.question}</h1>
                    {
                        (poll.answers).map(answer => {
                            return (<p key = {answer.answer_id}>{answer.answer}</p>);
                        })
                    }
                </>:
                <p className='error'>Помилка</p>
            }

        </div>
    );
};