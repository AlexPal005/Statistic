import express from "express";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";
import {getAdminPolls} from "../controllers/admin/getAdminPolls.js";
import getAdminCountPolls from "../controllers/admin/getAdminCountPolls.js";
import {setIsAllowed} from "../controllers/admin/setIsAllowed.js";
import {addAdmin} from "../controllers/admin/addAdmin.js";

const router = express.Router();
router.get('/getAdminPolls', roleMiddleWare(['ADMIN']), getAdminPolls);
router.get('/getAdminCountPolls', roleMiddleWare(['ADMIN']), getAdminCountPolls);
router.post('/setIsAllowed', roleMiddleWare(['ADMIN']), setIsAllowed);
router.post('/addAdmin', roleMiddleWare(['ADMIN']), addAdmin);
export default router;