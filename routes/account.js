import express from 'express';
import {addPoll} from "../controllers/acccount/addPoll.js";
import {getMyPolls} from "../controllers/acccount/getMyPolls.js";
import {deletePoll} from "../controllers/acccount/deletePoll.js";
import {getCountPolls} from "../controllers/acccount/getCountPolls.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
import {changePassword} from "../controllers/acccount/changePassword.js";
import {getVotedPolls} from "../controllers/acccount/getVotedPolls.js";
import {getCountVotedPolls} from "../controllers/acccount/getCountVotedPolls.js";

const router = express.Router();
router.post('/addPoll', roleMiddleWare(['ADMIN', 'USER']), addPoll);
router.get('/getMyPolls', roleMiddleWare(['ADMIN', 'USER']), getMyPolls);
router.post('/deletePoll', roleMiddleWare(['ADMIN', 'USER']), deletePoll);
router.get('/getCountPolls', roleMiddleWare(['ADMIN', 'USER']), getCountPolls);
router.post('/changePassword', roleMiddleWare(['ADMIN', 'USER']), changePassword);
router.get('/getVotedPolls', roleMiddleWare(['ADMIN', 'USER']), getVotedPolls);
router.get('/getCountVotedPolls', roleMiddleWare(['ADMIN', 'USER']), getCountVotedPolls);

export default router;
