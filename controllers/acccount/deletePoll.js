import {dataBase} from "../../database.js";

export const deletePoll = (req, res) => {
    const sqlRequest = "DELETE votes\n" +
        "FROM votes INNER JOIN answers a on votes.answer_id = a.answer_id\n" +
        `WHERE a.poll_id = ${req.body.id};\n` +
        "DELETE FROM answers\n" +
        `WHERE answers.poll_id = ${req.body.id};\n` +
        "DELETE FROM polls\n" +
        `WHERE polls.poll_id = ${req.body.id};`;
    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length) {
            return res.json('Успішно видалено!');
        } else {
            return res.status(501).json('Помилка!');
        }
    });
};

