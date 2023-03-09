import express from 'express';
import {addPoll} from "../controllers/acccount/addPoll.js";
import {getMyPolls} from "../controllers/acccount/getMyPolls.js";
import {deletePoll} from "../controllers/acccount/deletePoll.js";
import {getCountPolls} from "../controllers/acccount/getCountPolls.js";

const router = express.Router();
router.post('/addPoll', addPoll);
router.get('/getMyPolls', getMyPolls);
router.post('/deletePoll', deletePoll);
router.get('/getCountPolls', getCountPolls);

export default router;
