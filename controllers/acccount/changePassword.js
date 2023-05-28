import {dataBase} from "../../database.js";
import bcrypt from "bcryptjs";

const getPassword = async (userId) => {
    const request = `SELECT password
                     FROM user
                     WHERE id = ${userId};`;
    return new Promise((resolve, reject) => {
        dataBase.query(request, (err, data) => {
            if (err) {
                reject(JSON.stringify(err));
                return;
            }
            if (!data.length) {
                reject("Користувача не знайдено");
                return;
            }
            resolve(data[0].password);
        });
    })
}

export const changePassword = async (req, res) => {
    let password = "";
    try {
        password = await getPassword(req.body.userId);
    } catch (e) {
        return res.status(500).json(e);
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password.toString(), password);
    if (isPasswordCorrect) {
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);
        const updateRequest = `UPDATE user
                               SET password = ?
                               WHERE id = ?;`;
        const values = [hash, req.body.userId];
        dataBase.query(updateRequest, values, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.changedRows === 1) {
                return res.status(200).json("Успішно змінено пароль!");
            }
        });
    } else {
        return res.status(501).json("Пароль користувача невірний!");
    }
}