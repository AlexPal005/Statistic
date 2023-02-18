import "./MyPolls.scss";
import {useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmationDeletePoll} from "./ConfirmationDeletePoll/ConfirmationDeletePoll";
import {Pagination} from "../../../components/Pagination/Pagination";
import {Preloader} from "../../../components/Preloader/Preloader";

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
    const [isLoading, setIsLoading] = useState(true);

    //change the number of page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // get the current array of polls
    const getCurrentPolls = useCallback(async () => {
            setIsLoading(true);
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
            setIsLoading(false);
        },
        [countPollsOnPage, currentPage, currentUser.currentUser.id],
    );

    // get the count of polls
    const getCountPolls = useCallback(async () => {
        await axios.get("/polls/getCountPolls", {params: {userId: currentUser.currentUser.id}})
            .then(response => {
                setCountPolls(response.data[0].countPolls);
            });
    }, []);

    // get count polls and get polls from bd
    const getData = useCallback(() => {
        getCountPolls()
            .then(() => {
                getCurrentPolls().catch(console.error);
            }).catch(console.error);
    }, [getCountPolls, getCurrentPolls]);

    useEffect(() => {
        getData();
    }, [getData]);


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
        getData();
    };
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
                        })
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
                </>
            }
        </div>
    );
}