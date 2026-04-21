import express from 'express';
import { getSolicitudes, getSolicitud, updateSolicitud, deleteSolicitud } from '../controllers/solicitudController.js';
import { getEvidenciasBySolicitud } from '../controllers/evidenciaController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/',     getSolicitudes);
router.get('/:id',  getSolicitud);
router.put('/:id',  updateSolicitud);
router.delete('/:id', deleteSolicitud);

// Evidencias de una solicitud
router.get('/:solicitud_id/evidencias', getEvidenciasBySolicitud);

export default router;
