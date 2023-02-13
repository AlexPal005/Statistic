import "./MyPolls.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmationDeletePoll} from "./ConfirmationDeletePoll/ConfirmationDeletePoll";
import {Pagination} from "../../../components/Pagination/Pagination";

const Card = ({poll, answers, percentagesPoll, pollId, handleShowConfirmDelete}) => {
    return (
        <div className="card">
            <MdDeleteForever className="remove-poll-icon" onClick={() => {
                handleShowConfirmDelete(pollId);
            }}/>
            <p className="card-question">{poll.question}</p>
            <span className="count-votes">{poll.count_votes} голосів | {poll.name}</span>
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
    const currentUser = useContext(AuthContext);

    // click on to delete
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    // id of poll to delete
    const [idToDelete, setIdToDelete] = useState(null);
    // the count of polls
    const [countPolls, setCountPolls] = useState(1);

    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPolls, setCurrentPolls] = useState([]);

    //change the number of page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        // get the current array of polls
        const getCurrentPolls = async () => {
            console.log("getCurrentPolls");
            const lastPollIndex = currentPage * countPollsOnPage;
            const firstPollIndex = lastPollIndex - countPollsOnPage;

            await axios.get('/polls/getMyPolls/',
                {
                    params: {
                        userId: currentUser.currentUser.id,
                        firstPollIndex: firstPollIndex,
                        lastPollIndex: lastPollIndex
                    }
                })
                .then(response => {
                    setCurrentPolls(response.data);
                });
        };
        getCurrentPolls().catch(console.error);
    }, [currentPage, countPollsOnPage, currentUser.currentUser.id, countPolls]);

    // get the count of polls
    const getCountPolls = async () => {
        console.log("getCountPolls");
        await axios.get("/polls/getCountPolls")
            .then(response => {
                setCountPolls(response.data[0].countPolls);
            });
    };
    useEffect(() => {
        getCountPolls().catch(console.error);
    }, []);


    //show confirmation to delete
    const handleShowConfirmDelete = (pollId) => {
        setIdToDelete(pollId);
        setIsClickedDelete(true);
    };
    // delete poll from confirmation window
    const handleDeletePoll = async () => {
        try {
            await axios.post("/polls/deletePoll", {id: idToDelete});
        } catch (e) {
            console.log(e);
        }
        getCountPolls().catch(console.error);
        closeModal();
    };
    // close confirmation window
    const closeModal = () => {
        setIsClickedDelete(prev => !prev);
    };
    return (
        <div className="content-my-polls">
            {currentPolls.map((poll) => {
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
            <Pagination
                countPolls={countPolls}
                countPollsOnPage={countPollsOnPage}
                paginate={paginate}
            />
            {isClickedDelete && <ConfirmationDeletePoll closeModal={closeModal} deletePoll={handleDeletePoll}/>}
        </div>
    );
}