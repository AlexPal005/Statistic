import {Pagination} from "../../../components/Pagination/Pagination";
import {useCallback, useEffect, useState} from "react";
import {getCountPolls} from "../../getCountPolls";
import {getPolls} from "../../getPolls";
import {Preloader} from "../../../components/Preloader/Preloader";
import {PollCard} from "./PollCard";

export const AdminPolls = () => {
    // count of the polls that not checked
    const [countPolls, setCountPolls] = useState(0);
    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPolls, setCurrentPolls] = useState([]);
    const [isAdminChecked, setIsAdminChecked] = useState(1);

    const updateDataIfAdminCheckedPoll = () => {
        setIsAdminChecked(prev => prev + 1);
    }

    // get a count of polls and polls
    const getData = useCallback(() => {

        setIsLoading(true);
        getCountPolls('/admin/getAdminCountPolls', [])
            .then(count => {
                if (count) {
                    getPolls('/admin/getAdminPolls', [], currentPage, countPollsOnPage)
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

    }, [currentPage, isAdminChecked]);

    useEffect(() => {
        getData();
    }, [currentPage, isAdminChecked])


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
        <>
            {isLoading ? <Preloader/> :
                !countPolls ? <div className="error">Нічого не знайдено!</div> :
                    <>
                        {currentPolls.map(poll => {
                            return (
                                <PollCard
                                    key={poll.poll_id}
                                    poll={poll}
                                    updateDataIfAdminCheckedPoll = {updateDataIfAdminCheckedPoll}
                                />
                            )
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
        </>
    );
};