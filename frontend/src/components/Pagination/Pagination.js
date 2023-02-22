import "./Pagination.scss";
import {GrNext, GrPrevious} from "react-icons/gr";
import {useCallback, useEffect, useState} from "react";

export const Pagination = ({countPolls, countPollsOnPage, paginate, prev, next, currentPage}) => {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [variant, setVariant] = useState(1);

    const addNumber = (number) => {
        setPageNumbers(prev => {
            let newNumbers = prev.slice(0);
            newNumbers.push(number);
            return newNumbers;
        });
    }
    const generatePageNumbers = useCallback(() => {
        console.log('generatePageNumbers');
        // clear an array of page numbers
        setPageNumbers([]);

        // count of pages
        const countPages = Math.ceil(countPolls / countPollsOnPage);
        if (countPages > 7) {
            if (currentPage >= 1 && currentPage < 7) {
                for (let i = 1; i <= 7; i++) {
                    addNumber(i);
                }
                setVariant(1);
            } else if (currentPage >= countPages - 4 && currentPage <= countPages) {
                addNumber(1);
                for (let i = countPages - 6; i < countPages; i++) {
                    addNumber(i)
                }
                setVariant(2);
            } else {
                addNumber(1);
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    addNumber(i);
                }
                setVariant(3);
            }
            addNumber(countPages);
        } else {
            for (let i = 0; i < countPages; i++) {
                addNumber(i + 1);
            }
        }
    }, [countPolls, countPollsOnPage, currentPage]);

    useEffect(() => {
        generatePageNumbers();
    }, [generatePageNumbers]);
    useEffect(() => {
        console.log(pageNumbers);
    }, [pageNumbers, currentPage]);

    return (
        <div className="pagination-block">
            <div className="list-item-pagination" onClick={() => {
                prev();
            }}>
                <GrPrevious className="pagination-btn"/>
            </div>
            <ul className="pagination-list">

                {pageNumbers.map((number) => (
                    <span key={number}>
                        <li
                            className={
                                number === currentPage ?
                                    ["list-item-active", "list-item-pagination"].join(" ") :
                                    ["list-item-not-active", "list-item-pagination"].join(" ")
                            }
                            onClick={() => {
                                paginate(number);
                            }}
                        >
                            {number}

                        </li>
                        {
                            (variant === 1 && number === 7) ?
                                <li className="three-dots">...</li> :
                                (variant === 3 && (number === 1 || number === pageNumbers[pageNumbers.length - 2])) ?
                                    <li className="three-dots">...</li> :
                                    (variant === 2 && number === 1) &&
                                    <li className="three-dots">...</li>

                        }
                    </span>
                ))}
            </ul>
            <div className="list-item-pagination" onClick={() => {
                next();
            }}>
                <GrNext className="pagination-btn"/>
            </div>
        </div>
    );
}