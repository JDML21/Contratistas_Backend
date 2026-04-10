import express from 'express';
import { getPlanillas, getPlanilla, createPlanilla, updatePlanilla } from '../controllers/planillaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/',     getPlanillas);
router.get('/:id',  getPlanilla);
router.post('/',    createPlanilla);
router.put('/:id',  updatePlanilla);

export default router;
