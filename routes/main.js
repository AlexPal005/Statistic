import express from 'express';
import {getCountPolls, getPollById, getTopics} from "../controllers/main/main.js";
import {getMainPolls} from "../controllers/acccount/getMyPolls.js";
import {vote} from "../controllers/main/vote.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
import commentRouter from './comment.js';
const router = express.Router();

router.use('/comment', commentRouter);
router.get("/topics", getTopics);
router.get("/getMainPolls", getMainPolls);
router.get("/getCountPolls", getCountPolls);
router.post("/vote",  roleMiddleWare(['ADMIN', 'USER']), vote);
router.get("/getPollById", getPollById);
export default router;