import './PollPage.scss';
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Card} from "../main/MainPolls/MainPolls";
import {Preloader} from "../../components/Preloader/Preloader";

export const PollPage = () => {
    const pollId = useParams().pollId;
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [commentError, setCommentError] = useState('');
    const [comment, setComment] = useState('');
    const [isClickedTextArea, setIsClickedTextArea] = useState(false);

    const handleChangeComment = (e) => {
        if (e.target.value.length) {
            setComment(e.target.value);
            setCommentError('');
        } else {
            setCommentError('Коментар не може бути пустим!')
        }
    };

    const sendCommentToServer = (e) => {
        if((e.keyCode === 13 && e.shiftKey === false) || e.type === 'mousedown'){
            console.log('pressed');
        }
    };

    const getPoll = useCallback(() => {
        setIsLoading(true);
        axios.get('/main/getPollById', {params: {pollId: pollId}})
            .then(pollRes => {
                setPoll(pollRes.data[0]);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            })
    }, [poll]);

    useEffect(() => {
        getPoll();
    }, []);

    return (
        <div className='content-my-polls'>
            {isLoading ? <Preloader/> :
                poll &&
                <Card
                    key={poll.poll_id}
                    poll={poll}
                    isMainPage={false}
                />
            }
            <div className='comments-block'>
                <p className='comments-block__main-text'>Коментарі</p>
                <span className='comments-block__new-comment-text'>Новий коментар</span>
                <textarea
                    className={(isClickedTextArea && commentError) ? ["textarea-add-comment", "error-input"].join(" ") : "textarea-add-comment"}
                    placeholder='Коментар'
                    onChange={handleChangeComment}
                    onBlur={() => {
                        setIsClickedTextArea(true)
                    }}
                    onKeyDown={sendCommentToServer}
                />
                {(commentError && isClickedTextArea) && <p className='error'>{commentError}</p>}
                <button
                    className='button-add-comment'
                    disabled={!(commentError === '')}
                    onClick={sendCommentToServer}
                >
                    Додати
                </button>

            </div>
        </div>
    );
};