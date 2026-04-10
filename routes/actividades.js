import express from 'express';
import { getActividad, updateActividad, deleteActividad } from '../controllers/actividadController.js';
import { getEvidenciasByActividad } from '../controllers/evidenciaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/:id',    getActividad);
router.put('/:id',    updateActividad);
router.delete('/:id', deleteActividad);

// Evidencias de una actividad
router.get('/:actividad_id/evidencias', getEvidenciasByActividad);

export default router;
