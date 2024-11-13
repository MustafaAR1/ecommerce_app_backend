import express from 'express';
import register from '../controller/account/register.js';
import login from '../controller/account/login.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
export default router;