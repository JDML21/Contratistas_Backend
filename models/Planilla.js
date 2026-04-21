import pool from '../config/db.js';

const Planilla = {
  findById: async (planilla_id) => {
    const result = await pool.query(
      'SELECT * FROM planilla WHERE planilla_id = $1',
      [planilla_id]
    );
    return result.rows[0] || null;
  },

  findAll: async () => {
    const result = await pool.query(
      'SELECT * FROM planilla ORDER BY created_at DESC'
    );
    return result.rows;
  },

  create: async ({ estado = 'Pendiente', comentario = null }) => {
    const result = await pool.query(
      `INSERT INTO planilla (estado, comentario)
       VALUES ($1, $2)
       RETURNING *`,
      [estado, comentario]
    );
    return result.rows[0];
  },

  update: async (planilla_id, campos) => {
    const { estado, comentario } = campos;
    const result = await pool.query(
      `UPDATE planilla
       SET estado     = COALESCE($1, estado),
           comentario = COALESCE($2, comentario)
       WHERE planilla_id = $3
       RETURNING *`,
      [estado, comentario, planilla_id]
    );
    return result.rows[0] || null;
  },

  remove: async (planilla_id) => {
    const result = await pool.query(
      'DELETE FROM planilla WHERE planilla_id = $1 RETURNING *',
      [planilla_id]
    );
    return result.rows[0] || null;
  },
};

export default Planilla;
