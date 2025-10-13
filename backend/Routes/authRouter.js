import express from 'express'
import { checkAuth, deleteUser, login, logout, register, updateProfilepic } from '../Controllers/authController.js';
import { authenticated } from '../Middlewares/authenticated.js';
import { loginvalidate, registervalidate } from '../Middlewares/validation.js';

const router = express.Router();

router.post('/register', registervalidate, register);

router.post('/login', loginvalidate, login);

router.post('/logout', logout);

router.put('/updateProfilepic', authenticated, updateProfilepic);

router.get('/check', authenticated, checkAuth);

router.delete('/deleteAccount', authenticated, deleteUser);

export default router;