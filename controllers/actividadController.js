import Actividad from '../models/Actividad.js';

export const getActividadesByContrato = async (req, res) => {
  try {
    const actividades = await Actividad.findByContrato(req.params.contrato_id);
    res.json({ actividades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActividad = async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id);
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json({ actividad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const contrato_id = req.params.contrato_id;
    if (!nombre) {
      return res.status(400).json({ error: 'nombre es requerido' });
    }
    const actividad = await Actividad.create({ contrato_id, nombre, descripcion });
    res.status(201).json({ actividad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const actividad = await Actividad.update(req.params.id, req.body);
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json({ actividad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const actividad = await Actividad.remove(req.params.id);
    if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
    res.json({ message: 'Actividad eliminada', actividad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
