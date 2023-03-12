import "./MyPolls.scss";
import {useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmationDeletePoll} from "./ConfirmationDeletePoll/ConfirmationDeletePoll";
import {Pagination} from "../../../components/Pagination/Pagination";
import {Preloader} from "../../../components/Preloader/Preloader";
import {roundPercent} from "../../roundPercent";
import {getCountPolls} from "../../getCountPolls";
import {AuthContext} from "../../../context/authContext";
import {getPolls} from "../../getPolls";

const VoteField = ({answer, index, totalCountVotes}) => {
    const countVotes = answer.countVotes;

    //rounding of percentages
    const [votePercentageRes, votePercentage] = roundPercent(totalCountVotes, countVotes);

    return (
        <div key={index} className="answer-main">
             <span
                 className="percentages-answer"
             >
                {votePercentage ? votePercentageRes + "%" : 0 + "%"}
            </span>
            <div className="block-my-polls-line">
                <span className="text-answer">{answer.answer}</span>
                <div className="card-answer">
                    <div
                        className="line-value"
                        style={{width: votePercentage ? votePercentage.toFixed(2) + "%" : 0}}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({poll, pollId, handleShowConfirmDelete}) => {
    const [answers] = useState(poll.answers);
    return (
        <div className="card">
            <MdDeleteForever className="remove-poll-icon" onClick={() => {
                handleShowConfirmDelete(pollId);
            }}/>
            <span className="grey-data-card">Створено {new Date(poll.date_creation).toLocaleDateString()}</span>
            <p className="card-question">{poll.question}</p>
            <span className="grey-data-card">{poll.totalCountVotes} голосів | {poll.name}</span>
            <hr/>
            {answers.map((answer, index) => {
                return (
                    <VoteField
                        answer={answer}
                        index={index}
                        key={answer.answer_id}
                        totalCountVotes={poll.totalCountVotes}
                    />
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
    //the count of polls
    const [countPolls, setCountPolls] = useState(0);
    //get current polls
    const [currentPolls, setCurrentPolls] = useState([]);

    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // get a count of polls and polls
    const getData = useCallback(() => {
        const params = {
            userId: currentUser.currentUser.id
        };

        setIsLoading(true);
        getCountPolls("/polls/getCountPolls", params)
            .then(count => {
                setCountPolls(count);
            })
            .then(() => {
                getPolls('/polls/getMyPolls/', params, currentPage, countPollsOnPage)
                    .then((polls => {
                        setCurrentPolls(polls);
                    }))
            })
            .catch(err => {
                console.error(err);
            });

        setIsLoading(false);

    }, [countPolls, currentPolls, currentPage]);

    useEffect(() => {
        getData();
    },[currentPage])

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
        closeModal();
        if (countPolls % countPollsOnPage === 1) {
            setCurrentPage(prev => prev - 1);
        }
    };
    //change the number of page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // close confirmation window
    const closeModal = () => {
        setIsClickedDelete(prev => !prev);
    };
    // prev page
    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    //next page
    const next = () => {
        if (currentPage < countPolls / countPollsOnPage) {
            setCurrentPage(prev => prev + 1);
        }
    };
    return (
        <div className="content-my-polls">
            {isLoading ? <Preloader/> :
                <>
                    {
                        currentPolls.map((poll) => {
                            return (
                                <Card
                                    key={poll.poll_id}
                                    pollId={poll.poll_id}
                                    poll={poll}
                                    handleShowConfirmDelete={handleShowConfirmDelete}
                                />
                            );
                        })
                    }
                </>
            }
            <Pagination
                countPolls={countPolls}
                countPollsOnPage={countPollsOnPage}
                paginate={paginate}
                next={next}
                prev={prev}
                currentPage={currentPage}
            />
            {isClickedDelete && <ConfirmationDeletePoll closeModal={closeModal} deletePoll={handleDeletePoll}/>}
        </div>
    );
}