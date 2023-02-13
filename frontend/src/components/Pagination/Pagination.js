import "./Pagination.scss";

export const Pagination = ({countPolls, countPollsOnPage, paginate}) => {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(countPolls / countPollsOnPage); i++) {
        pageNumbers.push(i + 1);
    }
    return (
        <div className="pagination-block">
            <ul className="pagination-list">
                {pageNumbers.map((number) => (
                    <li className="list-item-pagination" key={number} onClick={() => {
                        paginate(number);
                    }}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
}