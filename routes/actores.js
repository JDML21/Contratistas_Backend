import express from 'express';
import { removeActor } from '../controllers/actoresContratoController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.delete('/:id', removeActor);

export default router;
