import {dataBase} from "../../database.js";


function getAnswers(pollId) {
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
        const get = new Promise((resolve, reject) => {
            let result = [];

            data.forEach(poll => {
                const writeAnswers = new Promise(async (resolve, reject) => {

                    const answers = await getAnswers(poll.poll_id)
                        .catch(err => {
                            throw new Error(err);
                        });
                    resolve({...poll, answers: answers})

                });
                writeAnswers.then(
                    res => {
                        result.push(res);
                        if(data[data.length - 1] === poll){
                            resolve(result);
                        }

                    },
                    err => {
                        throw new Error(err);
                    }
                );
            });
        });

        get.then(
            r => {
                console.log(r)
                const firstPollIndex = req.query.firstPollIndex;
                const lastPollIndex = req.query.lastPollIndex;
                const polls = r.slice(firstPollIndex, lastPollIndex);
                return res.json(polls);
            },
            err => {
                res.json(err);
            }
        );
    });
};

