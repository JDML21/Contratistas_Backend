import express from 'express';
import { getEvidencia, createEvidencia, updateEvidencia, deleteEvidencia } from '../controllers/evidenciaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/:id',    getEvidencia);
router.post('/',      createEvidencia);
router.put('/:id',    updateEvidencia);
router.delete('/:id', deleteEvidencia);

export default router;
