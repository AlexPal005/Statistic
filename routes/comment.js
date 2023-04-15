import express from "express";
import {addComment, getCommentsByPollId} from "../controllers/main/comment.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";

const router = express.Router();

router.post('/addComment', roleMiddleWare(['ADMIN', 'USER']), addComment);
router.get('/getComments', getCommentsByPollId);

export default router;
