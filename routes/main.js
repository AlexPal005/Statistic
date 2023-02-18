import express from 'express';
import {getCountPolls, getPolls, getTopics} from "../controllers/main.js";
const router = express.Router();

router.get("/topics", getTopics);
router.get("/polls", getPolls);
router.get("/getCountPolls", getCountPolls);

export default router;