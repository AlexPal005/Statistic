import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {getCountPolls} from "../getCountPolls";
import {getPolls} from "../getPolls";
import {Link} from "react-router-dom";
import {AiOutlineArrowRight} from "react-icons/ai";
import {Pagination} from "../../components/Pagination/Pagination";
import {Preloader} from "../../components/Preloader/Preloader";

export const VotedPolls = () => {
    const currentUser = useContext(AuthContext);
    const [countPolls, setCountPolls] = useState(0);
    const [currentPolls, setCurrentPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [countPollsOnPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getData = useCallback(() => {
        const params = {
            userId: currentUser.currentUser.id
        };
        getCountPolls("/polls/getCountVotedPolls", params)
            .then(count => {
                setCountPolls(count);
            })
            .then(() => {
                getPolls('/polls//getVotedPolls', params, currentPage, countPollsOnPage)
                    .then((polls => {
                        setCurrentPolls(polls);
                        setIsLoading(false);
                        console.log(polls);
                    }))
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });

        setIsLoading(true);
    }, [countPolls, currentPolls, currentPage]);

    useEffect(() => {
        getData();
    }, [currentPage, countPolls]);

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
                <>
                    {
                        currentPolls.map(poll => {
                            return <Card poll={poll}/>;
                        })
                    }
                    {countPolls > 5 &&
                        <Pagination
                            countPolls={countPolls}
                            countPollsOnPage={countPollsOnPage}
                            paginate={paginate}
                            next={next}
                            prev={prev}
                            currentPage={currentPage}
                        />
                    }
                </>
            }
        </div>
    );
}

const Card = ({poll}) => {
    return (
        <div className="card">
            <Link to={`/pollPage/${poll.poll_id}`}>
                <AiOutlineArrowRight className='card__arrow'/>
            </Link>
            <span className="grey-data-card">
                Створено {new Date(poll.date_creation).toLocaleDateString()}
            </span>
            <p className="card-question">{poll.question}</p>
        </div>
    );
}