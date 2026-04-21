import Planilla from '../models/Planilla.js';

export const getPlanillas = async (req, res) => {
  try {
    const planillas = await Planilla.findAll();
    res.json({ planillas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlanilla = async (req, res) => {
  try {
    const planilla = await Planilla.findById(req.params.id);
    if (!planilla) return res.status(404).json({ error: 'Planilla no encontrada' });
    res.json({ planilla });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlanilla = async (req, res) => {
  try {
    const { estado, comentario } = req.body;
    const planilla = await Planilla.create({ estado, comentario });
    res.status(201).json({ planilla });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlanilla = async (req, res) => {
  try {
    const planilla = await Planilla.update(req.params.id, req.body);
    if (!planilla) return res.status(404).json({ error: 'Planilla no encontrada' });
    res.json({ planilla });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlanilla = async (req, res) => {
  try {
    const planilla = await Planilla.remove(req.params.id);
    if (!planilla) return res.status(404).json({ error: 'Planilla no encontrada' });
    res.json({ message: 'Planilla eliminada', planilla });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
