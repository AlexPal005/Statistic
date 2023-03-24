import {Pagination} from "../../../components/Pagination/Pagination";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {getCountPolls} from "../../getCountPolls";
import {getPolls} from "../../getPolls";

export const AdminPolls = () => {
    // count of the polls that not checked
    const [countPolls, setCountPolls] = useState(0);
    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPolls, setCurrentPolls] = useState([]);

    // get a count of polls and polls
    const getData = useCallback(() => {

        setIsLoading(true);
        getCountPolls('/admin/getAdminCountPolls', [])
            .then(count => {
                if (count) {
                    getPolls('/admin/getAdminPolls', [], currentPage, countPollsOnPage)
                        .then((polls => {
                            setCurrentPolls(polls);
                            console.log(polls);
                        }));
                }
                setCountPolls(count);
            })
            .catch(err => {
                console.error(err);
            });

        setIsLoading(false);

    }, [currentPage]);

    useEffect(() => {
        getData();
    }, [currentPage])

    useEffect(() => {
        console.log()
    }, [currentPolls]);

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
            AdminPolls

            <Pagination
                countPolls={countPolls}
                countPollsOnPage={countPollsOnPage}
                paginate={paginate}
                next={next}
                prev={prev}
                currentPage={currentPage}
            />
        </>
    );
};