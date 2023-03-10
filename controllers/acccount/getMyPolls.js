import {dataBase} from "../../database.js";


function getAnswersBD(pollId) {
    const sqlRequest = "SELECT answer_id, answer\n" +
        "FROM answers\n" +
        "WHERE poll_id = ?;";
    return new Promise((resolve, reject) => {
        dataBase.query(sqlRequest, pollId, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            if (!data.length) {
                throw new Error('Нічого не знайдено!');
            }
            resolve(data);
        });
    });
}

const getTotalCountVotes = (pollId) => {
    const sqlRequest = "SELECT COUNT(*) as countTotalVotes\n" +
        "FROM votes\n" +
        "INNER JOIN answers a on votes.answer_id = a.answer_id\n" +
        "WHERE a.poll_id = (?);";
    return new Promise((resolve, reject) => {
        dataBase.query(sqlRequest, pollId, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            resolve(data);
        });
    });
};

function getNewPollIncludesAnswersAndCount(poll) {
    return new Promise((resolve, reject) => {
        getAnswersBD(poll.poll_id)
            .then(answers => {
                return ({...poll, answers: answers});
            })
            .then(poll => {
                getTotalCountVotes(poll.poll_id)
                    .then(countVotes => {
                        resolve({...poll, totalCountVotes: countVotes[0].countTotalVotes})
                    });
            })
    });
}

function formResult(polls) {
    return new Promise((resolve, reject) => {
        let resultPolls = [];
        polls.forEach((poll, index) => {
            getNewPollIncludesAnswersAndCount(poll)
                .then(answers => {
                    resultPolls.push(answers);
                    if (polls.length - 1 === index) {
                        resolve(resultPolls);
                    }
                });
        });
    });
}


export const getMyPolls = (req, res) => {
    const sqlRequest = "SELECT polls.poll_id, question, t.name, user_id, date_creation\n" +
        "FROM polls INNER JOIN topics t on polls.topic_id = t.id\n" +
        "WHERE polls.user_id = (?);";
    const userId = req.query.userId;

    dataBase.query(sqlRequest, userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.json('Ви ще не створили опитувань!');
        }
        formResult(data).then(
            result => {
                const firstPollIndex = req.query.firstPollIndex;
                const lastPollIndex = req.query.lastPollIndex;
                const polls = result.slice(firstPollIndex, lastPollIndex);
                return res.json(polls);
            },
            err => {
                res.json(err);
            }
        );
    });
};


// let result = [];
// return new Promise((resolve, reject) => {
//     data.forEach(poll => {
//         const writeAnswers = new Promise(async (resolve, reject) => {
//
//             const answers = await getAnswersBD(poll.poll_id)
//                 .catch(err => {
//                     throw new Error(err);
//                 });
//             resolve({...poll, answers: answers})
//
//         });
//         writeAnswers.then(
//             res => {
//                 result.push(res);
//                 if (data[data.length - 1] === poll) {
//                     resolve(result);
//                 }
//
//             },
//             err => {
//                 throw new Error(err);
//             }
//         );
//     });
// });
//
// get.then(
//     r => {
//         const firstPollIndex = req.query.firstPollIndex;
//         const lastPollIndex = req.query.lastPollIndex;
//         const polls = r.slice(firstPollIndex, lastPollIndex);
//         return res.json(polls);
//     },
//     err => {
//         res.json(err);
//     }
// }













