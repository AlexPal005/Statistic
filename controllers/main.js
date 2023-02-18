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

// get polls from bd
export const getPolls = (req, res) => {
    const sqlRequest =
        "SELECT question, answers, name, nick_name, results, count_votes\n" +
        "FROM polls INNER JOIN user ON polls.user_id = user.id\n" +
        "INNER JOIN topics ON polls.topic_id = topics.id\n" +
        "WHERE topic_id = ?;";
    const topicId = req.query.topicId;
    dataBase.query(sqlRequest, topicId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.status(400).json("Нічого не знайдено!");
        }

        const firstPollIndex = req.query.firstPollIndex;
        const lastPollIndex = req.query.lastPollIndex;
        const polls = data.slice(firstPollIndex, lastPollIndex);
        return res.json(polls);
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