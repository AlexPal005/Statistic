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

        const sqlAddRole = `INSERT INTO roles_of_users (role_id, user_id)
                            VALUES (2, ${data.insertId});`
        dataBase.query(sqlAddRole, (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.status(200).json('Користувача створено успішно!');
        });
    });
};

export const confirmation = (req, res) => {
    //check existing user
    const sqlRequest = "SELECT * FROM user WHERE email = ? OR nick_name = ?";
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
                    return res.status(500).json(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({key: randomKey, res: "Повідомлення надіслано!"});
                }
            });

        });

};

// get user's roles
function getRolesUser(userId) {

    const sqlRequest = `SELECT role_name
                        FROM roles
                                 INNER JOIN roles_of_users rou on roles.role_id = rou.role_id
                        WHERE rou.user_id = ${userId};`;

    return new Promise((resolve, reject) => {
        dataBase.query(sqlRequest, (err, data) => {
            if (err) {
                reject(JSON.stringify(err));
            }
            if (!data.length) {
                reject('Помилка! Ролей не знайдено!');
            }
            resolve(data);
        });
    })
}

export const login = (req, res) => {
    //check user
    const sqlRequest = "SELECT * FROM user WHERE nick_name = ? ";

    dataBase.query(sqlRequest, [req.body.nickName], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (!data.length) {
            return res.status(404).json('Користувача не знайдено!');
        }

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) {
            return res.status(404).json('Неправильне ім\'я користувача або пароль!');
        }
        getRolesUser(data[0].id)
            .then(roles => {
                // jwt token
                const {password, ...other} = data[0];
                const dataToSend = {
                    id: other.id,
                    nick_name: other.nick_name,
                    roles: []
                };

                roles.forEach(role => {
                    dataToSend.roles.push(role.role_name);
                });

                const token = jwt.sign(dataToSend, "jwtkey");
                res.cookie('accessToken', token, {
                    httpOnly: true
                }).status(200).json(token);
            })
            .catch((err) => {
                return res.status(501).json({message: "Помилка в отриманні ролей!", error: err});
            });
    });
};


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Користувач вийшов з акаунта!");
};
