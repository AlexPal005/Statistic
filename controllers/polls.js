import {dataBase} from "../database.js";

export const addPoll = (req, res) => {
    const sqlRequest = "INSERT INTO polls (`question`, `answers`, `topic_id`, `user_id`, `is_checked`) VALUES(?) ";
    const values = [req.body.question, req.body.answers, req.body.topicId, req.body.userId, false];
    dataBase.query(sqlRequest, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json('Ваше опитування успішно надіслане модератору!');
    });
}