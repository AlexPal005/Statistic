import {Pagination} from "../../../components/Pagination/Pagination";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Preloader} from "../../../components/Preloader/Preloader";
import "./MainPolls.scss";
import {roundPercent} from "../../roundPercent";
import {getCountPolls} from "../../getCountPolls";
import {getPolls} from "../../getPolls";
import {AuthContext} from "../../../context/authContext";
import axios from "axios";
import {AiOutlineArrowRight} from "react-icons/ai";

export const VoteField = ({
                              answer,
                              pollId,
                              id,
                              refsRadio,
                              vote,
                              totalCountVotes,
                              indexForRefs,
                              isUserVotedBefore,
                              countVotes
                          }) => {
    const [votePercentage, setVotePercentage] = useState(0);
    //rounding of percentages
    const [votePercentageRes, setVotePercentageRes] = useState(0);

    useEffect(() => {
        setVotePercentage(countVotes / totalCountVotes * 100);
        setVotePercentageRes(roundPercent(totalCountVotes, countVotes));
    }, [countVotes, totalCountVotes]);

    const handleChangeRadio = () => {
        vote(id);
    };
    return (
        <label className="vote-checkbox-block answer-main">
            {
                isUserVotedBefore ?
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
            <div className={isUserVotedBefore ? "block-my-polls-line" : "block-main-polls-line"}>
                <span className="text-answer">{answer.answer}</span>
                {isUserVotedBefore &&
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

export const Card = ({poll, updateDataIfVoted, isMainPage}) => {
    const navigate = useNavigate();
    const currentUser = useContext(AuthContext);
    const [answers, setAnswers] = useState(poll.answers);
    const [isVoted, setIsVoted] = useState(false);
    const refsRadio = useRef([]);
    const [isChangedVote, setIsChangeVote] = useState(false);
    const [answerId, setAnswerId] = useState(null);
    //Has the user voted before
    const [isUserVotedBefore, setIsUserVotedBefore] = useState(false);

    const checkHasUserVoted = useCallback(() => {
        if (currentUser.currentUser) {
            poll.usersVotes.forEach((vote) => {
                if (vote.user_id === currentUser.currentUser.id) {
                    setIsUserVotedBefore(true);
                }
            });
        } else {
            setIsUserVotedBefore(false);
        }
    }, [poll, currentUser.currentUser]);

    useEffect(() => {
        setAnswers(poll.answers);
    }, [poll.answers]);

    useEffect(() => {
        checkHasUserVoted();
    }, [checkHasUserVoted])

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
        if (currentUser.currentUser) {
            axios.post("/main/vote",
                {
                    answerId: answerId,
                    userId: currentUser.currentUser.id,
                    pollId: poll.poll_id
                })
                .then(response => {
                    updateDataIfVoted();
                    console.log(response);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            navigate('/LogIn');
        }
    };

    return (
        <div className="card">
            {
                isMainPage &&
                <Link to={`/pollPage/${poll.poll_id}`}>
                    <AiOutlineArrowRight className='card__arrow'/>
                </Link>
            }


            <span className="grey-data-card">
                Створено {new Date(poll.date_creation).toLocaleDateString()} {poll.nick_name}
            </span>
            <p className="card-question">{poll.question}</p>
            <span className="grey-data-card">{poll.totalCountVotes} голосів | {poll.name}
                {isUserVotedBefore && <span className="error"> | Проголосовано!</span>}
            </span>

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
                        isUserVotedBefore={isUserVotedBefore}
                        totalCountVotes={poll.totalCountVotes}
                        indexForRefs={index}
                        countVotes={answer.countVotes}
                    />
                );
            })}
            {isUserVotedBefore ||
                <button
                    disabled={!isVoted}
                    className="button-vote"
                    onClick={voteSend}
                >
                    Голосувати
                </button>
            }
        </div>);
};
export const MainPolls = () => {

    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const topicId = useParams().topicId;
    //the count of polls
    const [countPolls, setCountPolls] = useState(0);
    //get current polls
    const [currentPolls, setCurrentPolls] = useState([]);

    const [checkIsVoted, setCheckIsVoted] = useState(1);

    const [countOfLoading, setCountOfLoading] = useState(0);

    const updateDataIfVoted = () => {
        setCheckIsVoted(prev => prev + 1);
    };

    // get a count of polls and polls
    const getData = useCallback(() => {
        const params = {
            topicId: topicId,
        };

        if (countOfLoading === 0) {
            setIsLoading(true);
        }
        getCountPolls('/main/getCountPolls', params)
            .then(count => {
                getPolls('/main/getMainPolls/', params, currentPage, countPollsOnPage)
                    .then((polls => {
                        setCurrentPolls(polls);
                        setIsLoading(false);
                    }));
                setCountPolls(count);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });

        setCountOfLoading(prev => prev + 1);
    }, [countPolls, currentPolls, currentPage, topicId, checkIsVoted]);

    useEffect(() => {
        getData();
    }, [currentPage, topicId, checkIsVoted])


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
        <div className='content-my-polls'>
            {isLoading ? <Preloader/> :

                !countPolls ? <div className="error">Нічого не знайдено!</div> :
                    <>
                        {currentPolls.map((poll) => {
                            return (
                                <Card
                                    key={poll.poll_id}
                                    poll={poll}
                                    updateDataIfVoted={updateDataIfVoted}
                                    isMainPage={true}
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