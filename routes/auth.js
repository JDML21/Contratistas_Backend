import express from 'express';
import { login, me, register } from '../controllers/authController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', verificarToken, me);

export default router;
