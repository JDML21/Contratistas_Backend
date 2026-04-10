import ActoresContrato from '../models/ActoresContrato.js';

export const getActoresByContrato = async (req, res) => {
  try {
    const actores = await ActoresContrato.findByContrato(req.params.contrato_id);
    res.json({ actores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addActor = async (req, res) => {
  try {
    const { usuario_id, tipo_actor } = req.body;
    const contrato_id = req.params.contrato_id;
    if (!usuario_id || !tipo_actor) {
      return res.status(400).json({ error: 'usuario_id y tipo_actor son requeridos' });
    }
    const actor = await ActoresContrato.create({ contrato_id, usuario_id, tipo_actor });
    res.status(201).json({ actor });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El usuario ya tiene ese rol en este contrato' });
    }
    if (error.code === '23503') {
      return res.status(404).json({ error: 'Contrato o usuario no existe' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const removeActor = async (req, res) => {
  try {
    const actor = await ActoresContrato.remove(req.params.id);
    if (!actor) return res.status(404).json({ error: 'Actor no encontrado' });
    res.json({ message: 'Actor eliminado', actor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
