import "./MyPolls.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmationDeletePoll} from "./ConfirmationDeletePoll/ConfirmationDeletePoll";

const Card = ({poll, answers, percentagesPoll, pollId, handleShowConfirmDelete}) => {
    return (
        <div className="card">
            <MdDeleteForever className="remove-poll-icon" onClick={() => {
                handleShowConfirmDelete(pollId);
            }}/>
            <p className="card-question">{poll.question}</p>
            <span className="count-votes">{poll.count_votes} голосів</span>
            <hr/>
            {answers.map((answer, index) => {
                return (
                    <div key={index}>
                        <span
                            className="percentages-answer"
                        >
                            {percentagesPoll[index] ? percentagesPoll[index] + "%" : 0 + "%"}
                        </span>
                        <div className="card-answer">
                            <div
                                className="line-value"
                                style={{width: percentagesPoll[index] ? percentagesPoll[index] + "%" : 0}}
                            >
                            </div>
                            <span className="text-answer">{answer}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export const MyPolls = () => {
    const [myPolls, setMyPolls] = useState([]);
    const currentUser = useContext(AuthContext);
    // click on to delete
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    // get my polls from bd
    const getMyPolls = () => {
        axios.post("/polls/getMyPolls", {userId: currentUser.currentUser.id})
            .then(response => {
                setMyPolls(response.data);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getMyPolls();
    }, [currentUser, myPolls]);
    //show confirmation to delete
    const handleShowConfirmDelete = (pollId) => {
        setIdToDelete(pollId);
        setIsClickedDelete(true);
    };
    const handleDeletePoll = () => {
        try {
            const res = axios.post("/polls/deletePoll", {id: idToDelete});
            console.log(res);
        } catch (e) {
            console.log(e);
        }
        getMyPolls();
        closeModal();
    };
    const closeModal = () => {
        setIsClickedDelete(prev => !prev);
    };
    return (
        <div className="content-my-polls">
            {myPolls.map((poll) => {
                const answers = poll.answers.split("#");
                answers.length = answers.length - 1;
                const percentagesPoll = poll.results.split("#");
                percentagesPoll.length = percentagesPoll.length - 1;
                return (
                    <Card
                        key={poll.id}
                        pollId={poll.id}
                        poll={poll}
                        handleShowConfirmDelete={handleShowConfirmDelete}
                        answers={answers}
                        percentagesPoll={percentagesPoll}
                    />
                );
            })}
            {isClickedDelete && <ConfirmationDeletePoll closeModal={closeModal} deletePoll={handleDeletePoll}/>}
        </div>
    );
}