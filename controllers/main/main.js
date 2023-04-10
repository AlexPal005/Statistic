import {dataBase} from "../../database.js";
import {formResultWithUsers} from "../acccount/getMyPolls.js";

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
    const sqlRequest = `SELECT COUNT(*) as countPolls
                        FROM polls
                        WHERE topic_id = ?
                          AND polls.is_allowed = TRUE
                          AND polls.is_checked = TRUE;`;
    const topicId = req.query.topicId;
    dataBase.query(sqlRequest, topicId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
};

export const getPollById = (req, res) => {
    const sqlRequest = `SELECT polls.poll_id, question, t.name, user_id, date_creation
                        FROM polls
                                 INNER JOIN topics t on polls.topic_id = t.id
                        WHERE poll_id = (?)
                          AND polls.is_checked = TRUE
                          AND polls.is_allowed = TRUE;`;
    const pollId = req.query.pollId;
    dataBase.query(sqlRequest, pollId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.status(400).json('Нічого не знайдено!');
        }
        formResultWithUsers(data)
            .then(polls => {
                return res.status(200).json(polls);
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    });
};