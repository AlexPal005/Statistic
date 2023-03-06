import express from 'express';
import {addPoll, deletePoll, getAnswersByPollId, getCountPolls, getMyPolls} from "../controllers/account.js";

const router = express.Router();
router.post('/addPoll', addPoll);
router.get('/getMyPolls', getMyPolls);
router.get('/getAnswersByPollId', getAnswersByPollId);
router.post('/deletePoll', deletePoll);
router.get('/getCountPolls', getCountPolls);

export default router;
