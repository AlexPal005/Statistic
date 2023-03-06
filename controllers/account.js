import {dataBase} from "../database.js";

export const addPoll = (req, res) => {
    const sqlRequestAddQuestion = "INSERT INTO polls " +
        "(`question`, `topic_id`, `user_id`, `is_checked`, `date_creation`) VALUES(?) ";
    const currentDate = new Date();
    const values = [req.body.question, req.body.topicId, req.body.userId, false, currentDate];

    dataBase.query(sqlRequestAddQuestion, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        const sqlRequestAddAnswers = "INSERT INTO answers (`answer`, `poll_id`) VALUES ?;";
        const answers = [];
        req.body.answers.map(answer => {
            answers.push([answer, data.insertId])
        });
        dataBase.query(sqlRequestAddAnswers, [answers], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.status(200).json('Ваше опитування успішно надіслане модератору!');
        });

    });

};
export const getMyPolls = (req, res) => {
    const sqlRequest = "SELECT polls.poll_id, question, topic_id, user_id, date_creation\n" +
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
        const firstPollIndex = req.query.firstPollIndex;
        const lastPollIndex = req.query.lastPollIndex;
        const polls = data.slice(firstPollIndex, lastPollIndex);
        return res.json(polls);
    });
};
export const getAnswersByPollId = (req, res) => {
    const sqlRequest = "SELECT answer_id, answer\n" +
        "FROM answers\n" +
        "WHERE poll_id = ?;";
    const pollId = req.query.pollId;
    console.warn(pollId);
    dataBase.query(sqlRequest, pollId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.json('Нічого не знайдено!');
        }
        return res.json(data);
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
