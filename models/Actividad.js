import pool from '../config/db.js';

const Actividad = {
  findById: async (actividad_id) => {
    const result = await pool.query(
      'SELECT * FROM actividad WHERE actividad_id = $1',
      [actividad_id]
    );
    return result.rows[0] || null;
  },

  findByContrato: async (contrato_id) => {
    const result = await pool.query(
      'SELECT * FROM actividad WHERE contrato_id = $1 ORDER BY created_at DESC',
      [contrato_id]
    );
    return result.rows;
  },

  create: async ({ contrato_id, nombre, descripcion = null }) => {
    const result = await pool.query(
      `INSERT INTO actividad (contrato_id, nombre, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [contrato_id, nombre, descripcion]
    );
    return result.rows[0];
  },

  update: async (actividad_id, campos) => {
    const { nombre, descripcion } = campos;
    const result = await pool.query(
      `UPDATE actividad
       SET nombre      = COALESCE($1, nombre),
           descripcion = COALESCE($2, descripcion)
       WHERE actividad_id = $3
       RETURNING *`,
      [nombre, descripcion, actividad_id]
    );
    return result.rows[0] || null;
  },

  remove: async (actividad_id) => {
    const result = await pool.query(
      'DELETE FROM actividad WHERE actividad_id = $1 RETURNING *',
      [actividad_id]
    );
    return result.rows[0] || null;
  },
};

export default Actividad;
