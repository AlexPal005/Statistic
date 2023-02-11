import express from 'express';
import {addPoll, deletePoll, getMyPolls} from "../controllers/polls.js";

const router = express.Router();
router.post('/addPoll', addPoll);
router.post('/getMyPolls', getMyPolls);
router.post('/deletePoll', deletePoll);

export default router;
