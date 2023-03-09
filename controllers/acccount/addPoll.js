import {dataBase} from "../../database.js";

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