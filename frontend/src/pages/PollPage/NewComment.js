import {useContext, useRef, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/authContext";
import {PollPageContext} from "./PollPage";

export const NewComment = ({parentId, hideNewComment}) => {
    const {updateComments, poll} = useContext(PollPageContext);
    const currentUser = useContext(AuthContext);
    const [isClickedTextArea, setIsClickedTextArea] = useState(false);
    const [commentError, setCommentError] = useState('Коментар не може бути пустим!');
    const [comment, setComment] = useState('');
    const commentTextRef = useRef(null);

    const handleChangeComment = (e) => {
        if (e.target.value.length) {
            setComment(e.target.value);
            setCommentError('');
        } else {
            setCommentError('Коментар не може бути пустим!')
        }
    };

    const sendCommentToServer = () => {
        axios.post('/main/comment/addComment', {
            pollId: poll.poll_id,
            comment: comment,
            userId: currentUser.currentUser.id,
            parentId: parentId
        })
            .then(() => {
                if(parentId !== -1){
                    hideNewComment();
                    updateComments();
                    return;
                }
                commentTextRef.current.value = '';
                setComment('');
                setCommentError('Коментар не може бути пустим!')
                setIsClickedTextArea(false);
                updateComments();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <span className='comments-block__new-comment-text'>Новий коментар</span>
            <textarea
                className={(isClickedTextArea && commentError) ? ["textarea-add-comment", "error-input"].join(" ") : "textarea-add-comment"}
                placeholder='Коментар'
                ref={commentTextRef}
                onChange={handleChangeComment}
                onBlur={() => {
                    setIsClickedTextArea(true)
                }}
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
    );
}