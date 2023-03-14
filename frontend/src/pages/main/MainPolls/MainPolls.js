import {Pagination} from "../../../components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Preloader} from "../../../components/Preloader/Preloader";
import "./MainPolls.scss";
import {roundPercent} from "../../roundPercent";
import {getCountPolls} from "../../getCountPolls";
import {getPolls} from "../../getPolls";
import {AuthContext} from "../../../context/authContext";
import axios from "axios";

const VoteField = ({answer, pollId, id, refsRadio, vote, isSentVote, totalCountVotes, indexForRefs}) => {
    const countVotes = answer.countVotes;
    //rounding of percentages
    const [votePercentageRes, votePercentage] = roundPercent(totalCountVotes, countVotes);

    const handleChangeRadio = () => {
        vote(id);
    };
    return (
        <label className="vote-checkbox-block answer-main">
            {
                isSentVote ?
                    <span
                        className="percentages-answer"
                    >
                         {votePercentage ? votePercentageRes + "%" : 0 + "%"}
                    </span> :

                    <input
                        type="radio"
                        name={`radio-answer-${pollId}`}
                        ref={el => refsRadio.current[indexForRefs] = el}
                        onChange={handleChangeRadio}
                    />
            }
            <div className={isSentVote ? "block-my-polls-line" : "block-main-polls-line"}>
                <span className="text-answer">{answer.answer}</span>
                {isSentVote &&
                    <div className="card-answer">
                        <div
                            className="line-value"
                            style={{width: votePercentage ? votePercentage.toFixed(2) + "%" : 0}}
                        >
                        </div>
                    </div>
                }

            </div>
        </label>
    );
};

const Card = ({poll}) => {
    const currentUser = useContext(AuthContext);
    const [answers] = useState(poll.answers);
    const [isVoted, setIsVoted] = useState(false);
    const refsRadio = useRef([]);
    const [isChangedVote, setIsChangeVote] = useState(false);
    const [isSentVote, setIsSentVote] = useState(false);
    const [answerId, setAnswerId] = useState(null);

    function vote(answerId) {
        setIsChangeVote(prev => !prev);
        setAnswerId(answerId);
    }

    useEffect(() => {
        refsRadio.current = refsRadio.current.slice(0, poll.answers.length);
    }, [poll.answers]);

    useEffect(() => {
        refsRadio.current.forEach(ref => {
            if (ref.checked) {
                setIsVoted(true);
            }
        });
    }, [isChangedVote]);

    // send the vote to db
    const voteSend = () => {
        axios.post("/main/vote",
            {
                answerId: answerId,
                userId: currentUser.currentUser.id,
                pollId: poll.poll_id
            })
            .then(response => {
                console.log(response);
                setIsSentVote(true);
            })
            .catch(err => {
                console.error(err);
                setIsSentVote(false);
            });
    };

    return (
        <div className="card">
            <span className="grey-data-card">
                Створено {new Date(poll.date_creation).toLocaleDateString()} {poll.nick_name}
            </span>
            <p className="card-question">{poll.question}</p>
            <span className="grey-data-card">{poll.totalCountVotes} голосів | {poll.name}</span>
            <hr/>
            {answers.map((answer, index) => {
                return (
                    <VoteField
                        key={answer.answer_id}
                        answer={answer}
                        id={answer.answer_id}
                        pollId={poll.poll_id}
                        refsRadio={refsRadio}
                        vote={vote}
                        isSentVote={isSentVote}
                        totalCountVotes={poll.totalCountVotes}
                        indexForRefs={index}
                    />
                );
            })}
            {isSentVote ||
                <button
                    disabled={!isVoted}
                    className="button-vote"
                    onClick={voteSend}
                >Голосувати
                </button>
            }
        </div>);
};
export const MainPolls = () => {
    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const topicId = useParams().topicId;
    //the count of polls
    const [countPolls, setCountPolls] = useState(0);
    //get current polls
    const [currentPolls, setCurrentPolls] = useState([]);

    // get a count of polls and polls
    const getData = useCallback(() => {
        const params = {
            topicId: topicId
        };

        setIsLoading(true);
        getCountPolls('/main/getCountPolls', params)
            .then(count => {
                if (count) {
                    getPolls('/main/getMainPolls/', params, currentPage, countPollsOnPage)
                        .then((polls => {
                            setCurrentPolls(polls);
                        }));
                }
                setCountPolls(count);
            })
            .catch(err => {
                console.error(err);
            });

        setIsLoading(false);

    }, [countPolls, currentPolls, currentPage, topicId]);

    useEffect(() => {
        getData();
    }, [currentPage, topicId])

    //change the number of page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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

                !countPolls ? <div className="error">Нічого не знайдено!</div> :
                    <>
                        {currentPolls.map((poll) => {
                            return (
                                <Card
                                    key={poll.poll_id}
                                    poll={poll}
                                />);
                        })}
                        <Pagination
                            countPolls={countPolls}
                            countPollsOnPage={countPollsOnPage}
                            paginate={paginate}
                            next={next}
                            prev={prev}
                            currentPage={currentPage}
                        />
                    </>

            }
        </div>
    );
};