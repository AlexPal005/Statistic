import express from 'express';
import {getTopics} from "../controllers/main.js";
const router = express.Router();

router.get("/topics", getTopics);

export default router;