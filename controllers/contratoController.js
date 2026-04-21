import Contrato from '../models/Contrato.js';

const TIPO_ACTOR_MAP = {
  contratista: 'Contratista',
  supervisor:  'Supervisor',
  gerente:     'Gerente',
};

export const getContratos = async (req, res) => {
  try {
    const { rol, id } = req.usuario;
    const tipoActor = TIPO_ACTOR_MAP[rol];
    const contratos = tipoActor
      ? await Contrato.findByUsuario(id, tipoActor)
      : await Contrato.findAll(); // admin ve todo
    res.json({ contratos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContrato = async (req, res) => {
  try {
    const contrato = await Contrato.findById(req.params.id);
    if (!contrato) return res.status(404).json({ error: 'Contrato no encontrado' });
    res.json({ contrato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContrato = async (req, res) => {
  try {
    const { duracion_semanas, valor_total, fecha_inicio, estado, url } = req.body;
    if (!duracion_semanas || !valor_total || !fecha_inicio) {
      return res.status(400).json({ error: 'duracion_semanas, valor_total y fecha_inicio son requeridos' });
    }
    const contrato = await Contrato.create({ duracion_semanas, valor_total, fecha_inicio, estado, url });
    res.status(201).json({ contrato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContrato = async (req, res) => {
  try {
    const contrato = await Contrato.update(req.params.id, req.body);
    if (!contrato) return res.status(404).json({ error: 'Contrato no encontrado' });
    res.json({ contrato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContrato = async (req, res) => {
  try {
    const contrato = await Contrato.remove(req.params.id);
    if (!contrato) return res.status(404).json({ error: 'Contrato no encontrado' });
    res.json({ message: 'Contrato eliminado', contrato });
  } catch (error) {
    // ON DELETE RESTRICT: contrato tiene actores asociados
    if (error.code === '23503') {
      return res.status(409).json({ error: 'No se puede eliminar: el contrato tiene actores asociados' });
    }
    res.status(500).json({ error: error.message });
  }
};
