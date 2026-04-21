import express from 'express';
import { getPlanillas, getPlanilla, createPlanilla, updatePlanilla, deletePlanilla } from '../controllers/planillaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/',     getPlanillas);
router.get('/:id',  getPlanilla);
router.post('/',    createPlanilla);
router.put('/:id',    updatePlanilla);
router.delete('/:id', deletePlanilla);

export default router;
