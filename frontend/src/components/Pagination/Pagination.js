import "./Pagination.scss";
import {GrNext, GrPrevious} from "react-icons/gr";

export const Pagination = ({countPolls, countPollsOnPage, paginate, prev, next, currentPage}) => {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(countPolls / countPollsOnPage); i++) {
        pageNumbers.push(i + 1);
    }
    return (
        <div className="pagination-block">
            <div className="list-item-pagination">
                <GrPrevious className="pagination-btn" onClick={() => {
                    prev();
                }}/>
            </div>
            <ul className="pagination-list">
                {pageNumbers.map((number) => (
                    <li
                        className={
                            number === currentPage ?
                                ["list-item-active", "list-item-pagination"].join(" ") :
                                ["list-item-not-active", "list-item-pagination"].join(" ")
                        }
                        // className="list-item-pagination"
                        key={number}
                        onClick={() => {
                            paginate(number);
                        }}
                    >
                        {number}
                    </li>
                ))}
            </ul>
            <div className="list-item-pagination">
                <GrNext className="pagination-btn" onClick={() => {
                    next();
                }}/>
            </div>
        </div>
    );
}