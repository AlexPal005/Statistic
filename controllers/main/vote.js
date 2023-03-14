import {dataBase} from "../../database.js";

function isExistVote(pollId, userId) {
    const sqlRequest = `SELECT *
                        FROM votes
                                 INNER JOIN answers a on votes.answer_id = a.answer_id
                        WHERE poll_id = ${pollId}
                          AND user_id = ${userId};`;

    return new Promise((resolve, reject) => {
        dataBase.query(sqlRequest, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            if (data.length) {
                resolve(true);
            }
            resolve(false);
        });
    });
}

export const vote = (req, res) => {
    const sqlRequest = "INSERT INTO votes (`answer_id`, `user_id`) VALUES(?);";
    const values = [req.body.answerId, req.body.userId];

    isExistVote(req.body.pollId, req.body.userId)
        .then(isExist => {
            if (isExist) {
                res.status(501).json("На жаль не можливо проголосувати двічі!");
            } else {
                dataBase.query(sqlRequest, [values], (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(200).json("Успішно проголосовано!");
                });
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        });

};