import {dataBase} from "../../database.js";

export const getAdminPolls = (req, res) => {
    const sqlRequest = `SELECT polls.poll_id, question, t.name, user_id, date_creation
                        FROM polls
                                 INNER JOIN topics t on polls.topic_id = t.id
                        WHERE polls.is_checked = FALSE;`;

    const firstPollIndex = req.query.firstPollIndex;
    const lastPollIndex = req.query.lastPollIndex;
    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        if (!data.length) {
            res.status(501).json({message: 'Опитувань не знайдено!'});
        }
        res.status(200).json(data.slice(firstPollIndex, lastPollIndex));
    });
};