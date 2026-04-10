import Evidencia from '../models/Evidencia.js';

export const getEvidenciasBySolicitud = async (req, res) => {
  try {
    const evidencias = await Evidencia.findBySolicitud(req.params.solicitud_id);
    res.json({ evidencias });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvidenciasByActividad = async (req, res) => {
  try {
    const evidencias = await Evidencia.findByActividad(req.params.actividad_id);
    res.json({ evidencias });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvidencia = async (req, res) => {
  try {
    const evidencia = await Evidencia.findById(req.params.id);
    if (!evidencia) return res.status(404).json({ error: 'Evidencia no encontrada' });
    res.json({ evidencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvidencia = async (req, res) => {
  try {
    const { url, estado, fecha, solicitud_id, actividad_id } = req.body;
    if (!url || !fecha) {
      return res.status(400).json({ error: 'url y fecha son requeridos' });
    }
    if (!solicitud_id && !actividad_id) {
      return res.status(400).json({ error: 'Debe pertenecer a una solicitud o actividad' });
    }
    const evidencia = await Evidencia.create({ url, estado, fecha, solicitud_id, actividad_id });
    res.status(201).json({ evidencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvidencia = async (req, res) => {
  try {
    const evidencia = await Evidencia.update(req.params.id, req.body);
    if (!evidencia) return res.status(404).json({ error: 'Evidencia no encontrada' });
    res.json({ evidencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvidencia = async (req, res) => {
  try {
    const evidencia = await Evidencia.remove(req.params.id);
    if (!evidencia) return res.status(404).json({ error: 'Evidencia no encontrada' });
    res.json({ message: 'Evidencia eliminada', evidencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
