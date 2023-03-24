import {dataBase} from "../../database.js";

const getAdminCountPolls = (req, res) => {
    const sqlRequest = `SELECT COUNT(*) as countPolls
                        FROM polls
                        WHERE is_checked = FALSE;`;
    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }

        res.status(200).json(data);
    });
};
export default getAdminCountPolls;