import axios from "axios";


// get the current array of polls
export function getPolls(url, params, currentPage, countPollsOnPage) {
    return new Promise((resolve, reject) => {
        const lastPollIndex = currentPage * countPollsOnPage;
        const firstPollIndex = lastPollIndex - countPollsOnPage;
        axios.get(url,
            {
                params: {
                    ...params,
                    firstPollIndex: firstPollIndex,
                    lastPollIndex: lastPollIndex
                }
            })
            .then(response => {
                resolve(response.data)
            });
    });
}
