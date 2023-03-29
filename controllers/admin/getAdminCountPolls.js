import {dataBase} from "../../database.js";

// get the count of polls, which didn't check admin
const getAdminCountPolls = (req, res) => {
    const sqlRequest = `SELECT COUNT(*) as countPolls
                        FROM polls
                        WHERE is_checked = FALSE;`;
    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
           return res.status(500).json(err);
        }

       return res.status(200).json(data);
    });
};
export default getAdminCountPolls;