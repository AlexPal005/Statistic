import {dataBase} from "../../database.js";
import {formResult} from "../acccount/getMyPolls.js";

export const getAdminPolls = (req, res) => {
    const sqlRequest = `SELECT polls.poll_id, question, t.name, user_id, date_creation, nick_name
                        FROM polls
                                 INNER JOIN topics t on polls.topic_id = t.id
                                 INNER JOIN user u on polls.user_id = u.id
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
        formResult(data).then(
            result => {
                res.status(200).json(result.slice(firstPollIndex, lastPollIndex));
            },
            err => {
                res.status(503).json(err);
            }
        );

    });
};