import {dataBase} from "../../database.js";

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

