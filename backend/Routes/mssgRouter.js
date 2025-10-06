import express from 'express'
import { authenticated } from '../Middlewares/authenticated.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../Controllers/mssgController.js';
const router = express.Router();

router.get('/users', authenticated, getUsersForSidebar);
router.get('/:id', authenticated, getMessages);

router.post('/send/:id', authenticated, sendMessage)

export default router;