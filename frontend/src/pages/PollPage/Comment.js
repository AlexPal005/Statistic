import './Comment.scss';
import {MdOutlineAccountCircle} from "react-icons/md";
import {useContext, useState} from "react";
import {NewComment} from "./NewComment";
import {PollPageContext} from "./PollPage";

export const Comment = ({commentData, comments}) => {
    const {poll} = useContext(PollPageContext);
    const [isResponseClicked, setIsResponseClicked] = useState(false);

    const responseClick = () => {
        setIsResponseClicked(true);
    };

    const hideNewComment = () => {
        setIsResponseClicked(false);
    };
    return (
        <div className='comment'>
            <div className='comment__icon-block'>
                <MdOutlineAccountCircle className="comment__icon"/>
            </div>
            <div className='comment__content'>
                <span className='comment__nick-name'>{commentData.nick_name}</span>
                <p className='comment__comment-text'>{commentData.comment}</p>
                <p className='comment__response-text' onClick={responseClick}>Відповісти</p>
                {isResponseClicked &&
                    <NewComment hideNewComment={hideNewComment} parentId={poll.poll_id}/>
                }
            </div>
        </div>
    );
}
