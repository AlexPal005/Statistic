import express from 'express';
import {getCountPolls, getTopics} from "../controllers/main/main.js";
import {getMainPolls} from "../controllers/acccount/getMyPolls.js";
import {vote} from "../controllers/main/vote.js";
const router = express.Router();

router.get("/topics", getTopics);
router.get("/getMainPolls", getMainPolls);
router.get("/getCountPolls", getCountPolls);
router.post("/vote", vote);

export default router;