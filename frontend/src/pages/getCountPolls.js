import axios from "axios";

export function getCountPolls(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: {...params}})
            .then(response => {
                resolve(response.data[0].countPolls);
            });
    });
}