import {Pagination} from "../../../components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Preloader} from "../../../components/Preloader/Preloader";
import "./MainPolls.scss";
import {roundPercent} from "../../roundPercent";

const VoteField = ({answer, pollId, id, refsRadio, vote, isSentVote, totalCountVotes, countVotes}) => {
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
            <div>
                <span className="text-answer">{answer}</span>
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

const Card = ({poll, answers, countVotes}) => {

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
            <span className="grey-data-card">{poll.count_votes} голосів | {poll.name}</span>
            <hr/>
            {answers.map((answer, index) => {
                return (
                    <VoteField
                        key={index}
                        answer={answer}
                        id={index}
                        pollId={poll.poll_id}
                        refsRadio={refsRadio}
                        vote={vote}
                        isSentVote={isSentVote}
                        countVotes={countVotes[index]}
                        totalCountVotes={poll.count_votes}
                    />
                );
            })}

            <button
                disabled={!isVoted}
                className="button-vote"
                onClick={voteSend}
            >Голосувати
            </button>
        </div>);
};
export const MainPolls = () => {
    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPolls, setCountPolls] = useState(0);
    const [currentPolls, setCurrentPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const topicId = useParams().topicId;

    // get all polls by topic
    const getCurrentPolls = useCallback(async () => {
        setIsLoading(true);
        const lastPollIndex = currentPage * countPollsOnPage;
        const firstPollIndex = lastPollIndex - countPollsOnPage;
        try {
            await axios.get('/main/polls', {
                params: {
                    topicId: topicId, firstPollIndex: firstPollIndex, lastPollIndex: lastPollIndex
                }
            })
                .then(response => {
                    setCurrentPolls(response.data);
                });
        } catch (e) {
            setCurrentPolls([]);
            console.error(e);
        }
        setIsLoading(false);
    }, [topicId, countPollsOnPage, currentPage],);

    //get count all of polls
    const getCountPolls = useCallback(async () => {
        try {
            await axios.get("/main/getCountPolls", {params: {topicId: topicId}})
                .then(response => {
                    setCountPolls(response.data[0].countPolls);
                });
        } catch (e) {
            setCountPolls(0);
            console.error(e);
        }
    }, [topicId]);

    // get count polls and get polls from bd
    const getData = useCallback(() => {
        getCountPolls()
            .then(() => {
                getCurrentPolls().catch(console.error);
            });
    }, [getCountPolls, getCurrentPolls]);

    // get the count of polls and current polls
    useEffect(() => {
        getData();
    }, [getData]);

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

                !currentPolls.length ? <div className="error">Нічого не знайдено!</div> : <>
                    {currentPolls.map((poll) => {
                        const answers = poll.answers.split("#");
                        answers.length = answers.length - 1;
                        const countVotes = poll.results.split("#");
                        countVotes.length = countVotes.length - 1;
                        return (<Card
                            key={poll.poll_id}
                            poll={poll}
                            answers={answers}
                            countVotes={countVotes}
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