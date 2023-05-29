import {dataBase} from "../../database.js";

export const getVotedPolls = (req, res) => {
    const sqlRequest = `SELECT question, date_creation, a.poll_id
                        FROM polls
                                 INNER JOIN answers a on polls.poll_id = a.poll_id
                                 INNER JOIN votes v on a.answer_id = v.answer_id
                        WHERE v.user_id = ?;`;
    const userId = req.query.userId;

    dataBase.query(sqlRequest, userId, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.status(400).json('Ви ще не брали участь в опитуваннях!');
        }
        return res.status(200).json(data.slice(req.query.firstPollIndex, req.query.lastPollIndex));
    });
}