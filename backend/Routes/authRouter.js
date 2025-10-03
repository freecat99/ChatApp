import express from 'express'
import { checkAuth, login, logout, register, updateProfilepic } from '../Controllers/authController.js';
import { authenticated } from '../Middlewares/authenticated.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/updateProfilepic', authenticated, updateProfilepic);

router.get('/check', authenticated, checkAuth);

export default router;