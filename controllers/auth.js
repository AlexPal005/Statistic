import {dataBase} from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    //check existing user
    const sqlRequest = "SELECT *FROM user WHERE email = ? OR nick_name = ?";
    dataBase.query(sqlRequest, [req.body.email, req.body.nickName],
        (err, data) => {
            if (err) {
                return res.json(err);
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
                return res.status(200).json('Користувача створено успішно!');
            });
        });
};

export const login = (req, res) => {
    //check user
    const sqlRequest = "SELECT * FROM user WHERE nick_name = ? ";

    dataBase.query(sqlRequest, [req.body.nickName], (err, data) => {
        if(err) {
            return res.json(err);
        }
        if (data.length === 0) {
            return res.status(404).json('Користувача не знайдено!');
        }

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect){
            return res.status(404).json('Неправильне ім\'я користувача або пароль!');
        }
        const token = jwt.sign({id:data[0].id},"jwtkey");
        const {password, ...other} = data[0];

        res.cookie('access_token', token,{
            httpOnly: true
        }).status(200).json(other);
    });
};

export const logout = (req, res) => {

};