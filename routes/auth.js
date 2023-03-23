import express from 'express';
import {confirmation, login, logout, register} from "../controllers/auth.js";
import {roleMiddleWare} from "../middleWares/roleMiddleWare.js";

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout',  roleMiddleWare(['ADMIN', 'USER']), logout);
router.post('/confirmation', confirmation);


export default router;