import express from 'express';
import {addPoll} from "../controllers/polls.js";

const router = express.Router();
router.post('/addPoll', addPoll);

export default router;
