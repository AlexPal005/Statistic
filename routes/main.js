import express from 'express';
import {getCountPolls, getTopics} from "../controllers/main/main.js";
import {getMainPolls} from "../controllers/acccount/getMyPolls.js";
import {vote} from "../controllers/main/vote.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
const router = express.Router();

router.get("/topics", getTopics);
router.get("/getMainPolls", getMainPolls);
router.get("/getCountPolls", getCountPolls);
router.post("/vote",  roleMiddleWare(['ADMIN', 'USER']), vote);

export default router;