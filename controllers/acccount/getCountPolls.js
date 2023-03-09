import {dataBase} from "../../database.js";

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
