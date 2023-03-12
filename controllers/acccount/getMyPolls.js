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

function getCountVotesCurrAnswer(answerId) {
    const sqlRequest = "SELECT COUNT(*) as countVotes\n" +
        "FROM votes\n" +
        "WHERE answer_id = (?);";
    return new Promise((resolve, reject) => {
        dataBase.query(sqlRequest, answerId, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            resolve(data);
        });
    });
}

function setCountVotesToAnswers(answers) {
    return new Promise((resolve, reject) => {
        const resAnswers = [];
        answers.forEach((answer, index) => {
            getCountVotesCurrAnswer(answer.answer_id)
                .then((countVotes => {
                    resAnswers.push({...answer, countVotes: countVotes[0].countVotes});

                }));
            if (index === answers.length - 1) {
                resolve(resAnswers);
            }
        });
    });
}

function getNewPollIncludesAnswersAndCount(poll) {
    return new Promise((resolve, reject) => {
        getAnswersBD(poll.poll_id)
            .then(answers => {
                setCountVotesToAnswers(answers)
                    .then(resAnswers => {
                        return {...poll, answers: resAnswers};
                    })
                    .then(poll => {
                        getTotalCountVotes(poll.poll_id)
                            .then(countVotes => {
                                resolve({...poll, totalCountVotes: countVotes[0].countTotalVotes})
                            });
                    });
            });
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

// cut the result polls
function cutPolls(firstPollIndex, lastPollIndex, polls) {
    return polls.slice(firstPollIndex, lastPollIndex);
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
                return res.json(cutPolls(req.query.firstPollIndex, req.query.lastPollIndex, result));
            },
            err => {
                res.json(err);
            }
        );
    });
};

export const getMainPolls = (req, res) => {
    const sqlRequest = "SELECT polls.poll_id, question, t.name, user_id, date_creation\n" +
        "FROM polls\n" +
        "         INNER JOIN topics t on polls.topic_id = t.id\n" +
        "WHERE topic_id = (?);";
    const topicId = req.query.topicId;

    dataBase.query(sqlRequest, topicId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.json('Нічого не знайдено!');
        }
        formResult(data).then(
            result => {
                return res.json(cutPolls(req.query.firstPollIndex, req.query.lastPollIndex, result));
            },
            err => {
                res.json(err);
            }
        );
    });
};








