import {dataBase} from "../../database.js";

// isUserExistsAndUserAdmin if the user exists
function isExistsUser(userName) {
    const sqlCheckUser = `SELECT *
                          FROM user
                          WHERE nick_name = '${userName}';`;
    return new Promise((resolve, reject) => {
        dataBase.query(sqlCheckUser, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            if (data.length) {
                resolve(true);
            }

            resolve(false);
        });
    });
}

function isExistsAdmin(userName) {
    const sqlAddAdmin = `SELECT *
                         FROM roles_of_users
                                  INNER JOIN user u on roles_of_users.user_id = u.id
                                  INNER JOIN roles r on roles_of_users.role_id = r.role_id
                         WHERE u.nick_name = '${userName}'
                           AND r.role_id = 1;`;

    return new Promise((resolve, reject) => {
        dataBase.query(sqlAddAdmin, (err, data) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            if (data.length) {
                resolve(true);
            }

            resolve(false);
        });
    });
}

// add a new admin
export const addAdmin = async (req, res) => {

    const sqlAddAdmin = `INSERT INTO roles_of_users (role_id, user_id)
                         VALUES ((SELECT role_id FROM roles WHERE role_name = 'ADMIN'),
                                 (SELECT id
                                  FROM user
                                  WHERE nick_name = '${req.body.userName}'));`;

    isExistsUser(req.body.userName)
        .then(isUser => {
            console.log('user')
            if (!isUser) {
                throw new Error('Користувача не існує!');
            }
        })
        .then(() => {
            isExistsAdmin(req.body.userName)
                .then((isAdmin) => {
                    if (isAdmin) {
                        throw new Error('Користувач вже адмін!');
                    }
                })
                .then(() => {
                    dataBase.query(sqlAddAdmin, (err, data) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        return res.status(200).json({message: 'Успішно додано адміністратора!'});
                    });
                })
                .catch(err => {
                    return res.status(501).json({message: err.message});
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(501).json({message: err.message});
        })

};