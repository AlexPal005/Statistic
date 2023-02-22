import {Pagination} from "../../../components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Preloader} from "../../../components/Preloader/Preloader";

const Card = ({poll, answers, percentagesPoll}) => {
    return (
        <div className="card">
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
            await axios.get('/main/polls',
                {
                    params: {
                        topicId: topicId,
                        firstPollIndex: firstPollIndex,
                        lastPollIndex: lastPollIndex
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

                !currentPolls.length ? <div className="error">Нічого не знайдено!</div> :
                    <>
                        {
                            currentPolls.map((poll) => {
                                const answers = poll.answers.split("#");
                                answers.length = answers.length - 1;
                                const percentagesPoll = poll.results.split("#");
                                percentagesPoll.length = percentagesPoll.length - 1;
                                return (
                                    <Card
                                        key={poll.poll_id}
                                        poll={poll}
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
                    </>

            }
        </div>
    );
};