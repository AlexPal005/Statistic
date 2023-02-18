import {dataBase} from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

export const register = (req, res) => {

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
};

export const confirmation = (req, res) => {
    //check existing user
    const sqlRequest = "SELECT *FROM user WHERE email = ? OR nick_name = ?";
    dataBase.query(sqlRequest, [req.body.email, req.body.nickName],
        (err, data) => {
            if (err) {
                return res.json(err);
            }
            if (data.length) {
                return res.status(409).json('Користувач з таким іменем чи поштою вже існує!');
            }
            const randomKey = randomstring.generate(10);
            const mailer = nodemailer.createTransport({
                host: 'smtp.ukr.net',
                port: 465,
                auth: {
                    user: "StatisticsCom@ukr.net",
                    pass: "TpqsBIXfFXncfhAS"
                }
            });
            const options = {
                from: "StatisticsCom@ukr.net",
                to: req.body.email,
                subject: "Підтвердження реєстрації Statistics",
                html: `<h1 style = "color: rgb(41, 159, 215)">Statistics</h1> 
        <h3>${req.body.nickName.toUpperCase()}, для того, щоб підтвердити реєстрацію уведіть в поле даний код: </h3> 
        <h2>${randomKey}</h2>
        <h3>Якщо ви не реєструвались, то проігноруйте дане повідомлення!</h3>`

            };
            mailer.sendMail(options, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({key: randomKey, res: "Повідомлення надіслано!"});
                }
            });

        });

};

export const login = (req, res) => {
    //check user
    const sqlRequest = "SELECT * FROM user WHERE nick_name = ? ";

    dataBase.query(sqlRequest, [req.body.nickName], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length === 0) {
            return res.status(404).json('Користувача не знайдено!');
        }

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) {
            return res.status(404).json('Неправильне ім\'я користувача або пароль!');
        }
        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0];

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(other);
    });
};


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Користувач вийшов з акаунта!");
};