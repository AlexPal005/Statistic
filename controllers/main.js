import {dataBase} from "../database.js";

export const getTopics = (req, res) => {

    const sqlRequest = "SELECT * FROM topics;";
    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.status(400).json("Тем не знайдено!");
        }
        return res.json(data);
    });
};

// get the count of polls
export const getCountPolls = (req, res) => {
    const sqlRequest = "SELECT COUNT(*) as countPolls FROM polls WHERE topic_id = ?;";
    const topicId = req.query.topicId;
    dataBase.query(sqlRequest, topicId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
};