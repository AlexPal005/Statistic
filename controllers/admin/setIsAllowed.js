import {dataBase} from "../../database.js";

// set is checked and is allowed
export const setIsAllowed = (req, res) => {
    const isAllowed = req.body.isAllowed;
    const pollId = req.body.pollId;
    const sqlIsChecked = `SELECT is_checked
                          FROM polls
                          WHERE poll_id = ${pollId};`;
    const sqlRequest = `UPDATE polls
                        SET is_checked = true,
                            is_allowed = ${isAllowed}
                        WHERE poll_id = ${pollId};`;

    // is checked the poll before
    dataBase.query(sqlIsChecked, (err, data) => {
        if(err){
            return res.status(500).json(err);
        }
        if(data[0].is_checked){
            return res.status(501).json({message: 'Опитування вже було переглянуте'});
        }
        // change is_checked and is_allowed
        dataBase.query(sqlRequest, (err, data) => {
            if (err) {
               return  res.status(500).json(err);
            }
           return  res.status(200).json({message: 'Успішно змінено статус !'});

        });
    });


};