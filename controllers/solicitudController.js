import Solicitud from '../models/Solicitud.js';

export const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll();
    res.json({ solicitudes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSolicitudesByContrato = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findByContrato(req.params.contrato_id);
    res.json({ solicitudes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json({ solicitud });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSolicitud = async (req, res) => {
  try {
    const { contrato_id, estado, comentario, planilla_id } = req.body;
    if (!contrato_id) {
      return res.status(400).json({ error: 'contrato_id es requerido' });
    }
    const solicitud = await Solicitud.create({ contrato_id, estado, comentario, planilla_id });
    res.status(201).json({ solicitud });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.update(req.params.id, req.body);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json({ solicitud });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.remove(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json({ message: 'Solicitud eliminada', solicitud });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
