import {Pagination} from "../../../components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {Preloader} from "../../../components/Preloader/Preloader";
import "./MainPolls.scss";
import {roundPercent} from "../../roundPercent";
import {getCountPolls} from "../../getCountPolls";
import {getPolls} from "../../getPolls";

const VoteField = ({answer, pollId, id, refsRadio, vote, isSentVote, totalCountVotes}) => {
    const countVotes = answer.countVotes;
    //rounding of percentages
    const [votePercentageRes, votePercentage] = roundPercent(totalCountVotes, countVotes);
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
                        ref={el => refsRadio.current[id] = el}
                        onChange={vote}
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
    const [answers] = useState(poll.answers);
    const [isVoted, setIsVoted] = useState(false);
    const refsRadio = useRef([]);
    const [isChangedVote, setIsChangeVote] = useState(false);
    const [isSentVote, setIsSentVote] = useState(false);

    function vote() {
        setIsChangeVote(prev => !prev);
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

    const voteSend = () => {
        setIsSentVote(true);
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
                        id={index}
                        pollId={poll.poll_id}
                        refsRadio={refsRadio}
                        vote={vote}
                        isSentVote={isSentVote}
                        totalCountVotes={poll.totalCountVotes}
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