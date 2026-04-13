import pool from '../config/db.js';

const ActoresContrato = {
  findById: async (actores_contrato_id) => {
    const result = await pool.query(
      'SELECT * FROM actores_contrato WHERE actores_contrato_id = $1',
      [actores_contrato_id]
    );
    return result.rows[0] || null;
  },

  // Todos los actores de un contrato
  findByContrato: async (contrato_id) => {
    const result = await pool.query(
      'SELECT * FROM actores_contrato WHERE contrato_id = $1',
      [contrato_id]
    );
    return result.rows;
  },

  // Actores de un contrato con datos completos del usuario (JOIN con usuario)
  findByContratoWithUser: async (contrato_id) => {
    const result = await pool.query(
      `SELECT ac.actores_contrato_id, ac.contrato_id, ac.usuario_id, ac.tipo_actor,
         u.nombre, u.correo, u.identificacion, u.tipo_documento, u.activo
       FROM actores_contrato ac
       JOIN usuario u ON u.usuario_id = ac.usuario_id
       WHERE ac.contrato_id = $1`,
      [contrato_id]
    );
    return result.rows;
  },

  // Todos los contratos en los que participa un usuario
  findByUsuario: async (usuario_id) => {
    const result = await pool.query(
      'SELECT * FROM actores_contrato WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows;
  },

  create: async ({ contrato_id, usuario_id, tipo_actor }) => {
    const result = await pool.query(
      `INSERT INTO actores_contrato (contrato_id, usuario_id, tipo_actor)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [contrato_id, usuario_id, tipo_actor]
    );
    return result.rows[0];
  },

  remove: async (actores_contrato_id) => {
    const result = await pool.query(
      'DELETE FROM actores_contrato WHERE actores_contrato_id = $1 RETURNING *',
      [actores_contrato_id]
    );
    return result.rows[0] || null;
  },
};

export default ActoresContrato;
