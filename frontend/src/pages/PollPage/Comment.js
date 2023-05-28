import './Comment.scss';
import {MdOutlineAccountCircle} from "react-icons/md";
import {useState} from "react";
import {NewComment} from "./NewComment";
import {BiDotsVerticalRounded} from "react-icons/bi";

const FunctionalWindow = () => {
    return (
        <div className='functional-window'>
            <a>Видалити </a>
            <p>Редагувати</p>
        </div>
    );
}

export const Comment = ({commentData}) => {
    const [isResponseClicked, setIsResponseClicked] = useState(false);
    const [isClickedDots, setIsClickedDots] = useState(false);

    const responseClick = () => {
        setIsResponseClicked(true);
    };

    const hideNewComment = () => {
        setIsResponseClicked(false);
    };

    const onClickDots = () => {
        setIsClickedDots(prev => !prev);
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
                    <NewComment hideNewComment={hideNewComment} parentId={commentData.comment_id}/>
                }
                <BiDotsVerticalRounded className='comment__dots' onClick={onClickDots}/>
                {
                    isClickedDots &&
                    <FunctionalWindow/>
                }
            </div>
        </div>
    );
}
