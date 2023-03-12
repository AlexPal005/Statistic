import express from 'express';
import {getCountPolls, getTopics} from "../controllers/main.js";
import {getMainPolls} from "../controllers/acccount/getMyPolls.js";
const router = express.Router();

router.get("/topics", getTopics);
router.get("/getMainPolls", getMainPolls);
router.get("/getCountPolls", getCountPolls);

export default router;