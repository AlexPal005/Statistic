import {dataBase} from "../database.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {

    //check existing user
    const sqlRequest = "SELECT *FROM user WHERE email = ? OR nick_name = ?";
    dataBase.query(sqlRequest, [req.body.email, req.body.nickName],
        (err, data) => {
            if (err) {
                return res.json(err);
            }
            if (data.length) {
                res.status(409).json('User already exists!');
            }

            //hash the password and create a user
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            // insert user into db
            const sqlRequest = "INSERT INTO user (`email`, `nick_name`, `password`) VALUES(?)";
            const values = [req.body.email, req.body.nickName, hash];

            dataBase.query(sqlRequest, [values], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                return res.status(200).json('User has been created!');
            });
        });
};

export const login = (req, res) => {

};

export const logout = (req, res) => {

};