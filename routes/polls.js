import express from 'express';
import {addPoll, getMyPolls} from "../controllers/polls.js";

const router = express.Router();
router.post('/addPoll', addPoll);
router.post('/getMyPolls', getMyPolls);

export default router;
