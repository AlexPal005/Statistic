import {dataBase} from "../../database.js";

export const addComment = (req, res) => {
    const pollId = req.body.pollId;
    const parentId = req.body.parentId;
    const comment = req.body.comment;
    const userId = req.body.userId;

    let sqlRequest = `INSERT INTO comments (poll_id, comment, parent_id, user_id)
                      VALUES (${pollId}, '${comment}', ${parentId}, ${userId});`;

    // if comment is a response to other comment
    if (!parentId) {
        sqlRequest = `INSERT INTO comments (poll_id, comment, user_id)
                      VALUES (${pollId}, '${comment}', ${userId});`;
    }

    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json('Успішно додано коментар!');
    });
};

export const getCommentsByPollId = (req, res) => {
    const pollId = req.query.pollId;
    let sqlRequest = `SELECT comment_id, comment, user_id, nick_name, parent_id
                      FROM comments
                               INNER JOIN user u on comments.user_id = u.id
                      WHERE poll_id = ${pollId};`;

    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!data.length) {
            return res.status(501).json({message: 'Коментарів не знайдено!'})
        }
        return res.status(200).json(data);
    });
};
