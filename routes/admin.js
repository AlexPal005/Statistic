import express from "express";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
import {getAdminPolls} from "../controllers/admin/getAdminPolls.js";
import getAdminCountPolls from "../controllers/admin/getAdminCountPolls.js";

const router = express.Router();
router.get('/getAdminPolls', roleMiddleWare(['ADMIN']), getAdminPolls);
router.get('/getAdminCountPolls', roleMiddleWare(['ADMIN']), getAdminCountPolls);

export default router;