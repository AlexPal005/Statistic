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
};
export const getMyPolls = (req, res) => {
    const sqlRequest = "SELECT * FROM polls WHERE user_id = ?";
    dataBase.query(sqlRequest, req.body.userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if(!data.length){
            return res.json('Ви ще не створили опитувань!');
        }
        return res.json(data);
    });
};