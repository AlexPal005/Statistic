import express from 'express';
import {addPoll} from "../controllers/acccount/addPoll.js";
import {getMyPolls} from "../controllers/acccount/getMyPolls.js";
import {deletePoll} from "../controllers/acccount/deletePoll.js";
import {getCountPolls} from "../controllers/acccount/getCountPolls.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
import {changePassword} from "../controllers/acccount/changePassword.js";

const router = express.Router();
router.post('/addPoll', roleMiddleWare(['ADMIN', 'USER']), addPoll);
router.get('/getMyPolls', roleMiddleWare(['ADMIN', 'USER']), getMyPolls);
router.post('/deletePoll', roleMiddleWare(['ADMIN', 'USER']), deletePoll);
router.get('/getCountPolls', roleMiddleWare(['ADMIN', 'USER']), getCountPolls);
router.post('/changePassword', roleMiddleWare(['ADMIN', 'USER']), changePassword);

export default router;
