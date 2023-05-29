import {dataBase} from "../../database.js";

export const getCountVotedPolls = (req, res) => {
    const sqlRequest = `SELECT COUNT(*) as countPolls
                        FROM polls
                                 INNER JOIN answers a on polls.poll_id = a.poll_id
                                 INNER JOIN votes v on a.answer_id = v.answer_id
                        WHERE v.user_id = ?;`;

    const userId = req.query.userId;
    dataBase.query(sqlRequest, userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
}