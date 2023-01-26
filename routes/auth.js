import express from 'express';
import {confirmation, login, logout, register} from "../controllers/auth.js";

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/confirmation', confirmation);


export default router;