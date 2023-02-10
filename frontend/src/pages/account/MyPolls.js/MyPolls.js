import "./MyPolls.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmationDeletePoll} from "./ConfirmationDeletePoll/ConfirmationDeletePoll";

export const MyPolls = () => {
    const [myPolls, setMyPolls] = useState([]);
    const currentUser = useContext(AuthContext);
    // click on to delete
    const [isClickedDelete, setIsClickedDelete] = useState(false);

    useEffect(() => {
        // get my polls from bd
        const getMyPolls = () => {
            axios.post("/polls/getMyPolls", {userId: currentUser.currentUser.id})
                .then(response => {
                    setMyPolls(response.data);
                })
                .catch(error => console.log(error));
        }
        getMyPolls();
    }, []);
    //show confirmation to delete
    const handleDeletePoll = () => {
        setIsClickedDelete(true);
    };
    return (
        <div className="content-my-polls">
            {myPolls.map((poll) => {
                const answers = poll.answers.split("#");
                answers.length = answers.length - 1;
                const percentagesPoll = poll.results.split("#");
                percentagesPoll.length = percentagesPoll.length - 1;
                console.log(poll);
                return (
                    <div className="card" key={poll.id}>
                        <MdDeleteForever className="remove-poll-icon" onClick={handleDeletePoll}/>
                        <p className="card-question">{poll.question}</p>
                        <span className="count-votes">{poll.count_votes} голосів</span>
                        <hr/>
                        {answers.map((answer, index) => {
                            return (
                                <>
                                    <span
                                        className="percentages-answer"
                                    >
                                        {percentagesPoll[index] ? percentagesPoll[index] + "%" : 0 + "%"}
                                    </span>
                                    <div className="card-answer" key={index}>
                                        <div
                                            className="line-value"
                                            style={{width: percentagesPoll[index] ? percentagesPoll[index] + "%" : 0}}
                                        >
                                        </div>
                                        <span className="text-answer">{answer}</span>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                );
            })}
            {isClickedDelete && <ConfirmationDeletePoll/>}
        </div>
    );
}