import {dataBase} from "../../database.js";

export const addComment = (req, res) => {
    const pollId = req.body.pollId;
    const parentId = req.body.parentId;
    const comment = req.body.comment;
    const userId = req.body.userId;

    let sqlRequest = `INSERT INTO comments (poll_id, comment, parent_id, user_id)
                      VALUES (${pollId}, '${comment}', ${parentId}, ${userId});`;


    dataBase.query(sqlRequest, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json('Успішно додано коментар!');
    });
};

const createListFirstComments = (comments) => {
    const newListComments = [];
    comments.forEach((comment) => {
        if (comment.parent_id === -1) {
            newListComments.push(
                {
                    data: comment,
                    next: []
                }
            );
        }
    });

    return newListComments;
}
// create a list each element has the next reference to child comments
const createCommentsList = (nextComments, comments) => {
    nextComments.forEach(nextComment => {
        comments.forEach(comment => {
            if (nextComment.data.comment_id === comment.parent_id) {
                if (!nextComment?.next) {
                    nextComment.next = [];
                }
                nextComment.next.push({data: comment, next: []});
                if (!comments.length) {
                    return nextComments;
                }
            }
        })
        if (nextComment.next.length) {
            createCommentsList(nextComment.next, comments);
        }
    })
    return nextComments;
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
        const newCommentsList = createListFirstComments(data);
        return res.status(200).json(createCommentsList(newCommentsList, data));
    });
};
