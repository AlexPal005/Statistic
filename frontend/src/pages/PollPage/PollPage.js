import './PollPage.scss';
import {useParams} from "react-router-dom";
import {createContext, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Card} from "../main/MainPolls/MainPolls";
import {Preloader} from "../../components/Preloader/Preloader";
import {Comment} from "./Comment";
import {NewComment} from "./NewComment";

export const PollPageContext = createContext(null);

function Comments({comments}) {

    return (
        comments.map(comment => {
            return <div key={comment.data.comment_id} style = {{paddingLeft: '5%'}}>
                <Comment
                    commentData={comment.data}
                />
                <Comments comments={comment.next}/>
            </div>

        })
    );

}


export const PollPage = () => {
    const pollId = useParams().pollId;
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [updateCommentsValue, setUpdateCommentsValue] = useState(1);


    const updateComments = () => {
        setUpdateCommentsValue(prev => prev + 1);
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

    const getComments = useCallback(() => {
        axios.get('/main/comment/getComments', {params: {pollId: pollId}})
            .then(response => {
                setComments(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [comments]);

    useEffect(() => {
        getComments();
    }, [updateCommentsValue]);

    useEffect(() => {
        getPoll();
    }, []);

    return (
        <PollPageContext.Provider value={{updateComments, poll}}>
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
                    <span className='comments-block__main-text'>Коментарі <span>{comments.length}</span></span>
                    <Comments comments={comments}/>
                    <NewComment parentId={-1}/>
                </div>
            </div>
        </PollPageContext.Provider>

    );
};