import {dataBase} from "../database.js";

export const addPoll = (req, res) => {
    const sqlRequest = "INSERT INTO polls " +
        "(`question`, `answers`, `topic_id`, `user_id`, `is_checked`, `results`, `count_votes`) VALUES(?) ";
    const values = [req.body.question, req.body.answers, req.body.topicId, req.body.userId, false, "", 0];
    dataBase.query(sqlRequest, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.status(200).json('Ваше опитування успішно надіслане модератору!');
    });
};
export const getMyPolls = (req, res) => {
    const sqlRequest = "SELECT polls.poll_id, polls.question, polls.answers, polls.user_id, polls.results, topics.name, polls.count_votes\n" +
        "FROM polls INNER JOIN topics on polls.topic_id = topics.id AND user_id = ?;";
    const userId = req.query.userId;
    dataBase.query(sqlRequest, userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.json('Ви ще не створили опитувань!');
        }
        const firstPollIndex = req.query.firstPollIndex;
        const lastPollIndex = req.query.lastPollIndex;
        const polls = data.slice(firstPollIndex, lastPollIndex);
        return res.json(polls);
    });
};

export const deletePoll = (req, res) => {
    const sqlRequest = "DELETE FROM polls WHERE poll_id = ?";
    dataBase.query(sqlRequest, req.body.id, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length) {
            return res.json('Успішно видалено!');
        } else {
            return res.json('Помилка!');
        }
    });
};

// get the count of polls
export const getCountPolls = (req, res) => {
    const sqlRequest = "SELECT COUNT(*) as countPolls FROM polls WHERE user_id = ?;";
    const userId = req.query.userId;
    dataBase.query(sqlRequest, userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
};
