import express from 'express';
import { getContratos, getContrato, createContrato, updateContrato, deleteContrato } from '../controllers/contratoController.js';
import { getActoresByContrato, addActor } from '../controllers/actoresContratoController.js';
import { getActividadesByContrato, createActividad } from '../controllers/actividadController.js';
import { getSolicitudesByContrato, createSolicitud } from '../controllers/solicitudController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verificarToken);

router.get('/',     getContratos);
router.get('/:id',  getContrato);
router.post('/',    createContrato);
router.put('/:id',  updateContrato);
router.delete('/:id', deleteContrato);

// Actores de un contrato
router.get('/:contrato_id/actores',  getActoresByContrato);
router.post('/:contrato_id/actores', addActor);

// Actividades de un contrato
router.get('/:contrato_id/actividades',  getActividadesByContrato);
router.post('/:contrato_id/actividades', createActividad);

// Solicitudes de un contrato
router.get('/:contrato_id/solicitudes',  getSolicitudesByContrato);
router.post('/:contrato_id/solicitudes', createSolicitud);

export default router;
