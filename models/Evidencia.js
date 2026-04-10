import pool from '../config/db.js';

const Evidencia = {
  findById: async (evidencia_id) => {
    const result = await pool.query(
      'SELECT * FROM evidencia WHERE evidencia_id = $1',
      [evidencia_id]
    );
    return result.rows[0] || null;
  },

  findBySolicitud: async (solicitud_id) => {
    const result = await pool.query(
      'SELECT * FROM evidencia WHERE solicitud_id = $1 ORDER BY created_at DESC',
      [solicitud_id]
    );
    return result.rows;
  },

  findByActividad: async (actividad_id) => {
    const result = await pool.query(
      'SELECT * FROM evidencia WHERE actividad_id = $1 ORDER BY created_at DESC',
      [actividad_id]
    );
    return result.rows;
  },

  // solicitud_id o actividad_id: al menos uno requerido (CHECK en schema)
  create: async ({ url, estado = 'Pendiente', fecha, solicitud_id = null, actividad_id = null }) => {
    const result = await pool.query(
      `INSERT INTO evidencia (url, estado, fecha, solicitud_id, actividad_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [url, estado, fecha, solicitud_id, actividad_id]
    );
    return result.rows[0];
  },

  update: async (evidencia_id, campos) => {
    const { url, estado, fecha } = campos;
    const result = await pool.query(
      `UPDATE evidencia
       SET url    = COALESCE($1, url),
           estado = COALESCE($2, estado),
           fecha  = COALESCE($3, fecha)
       WHERE evidencia_id = $4
       RETURNING *`,
      [url, estado, fecha, evidencia_id]
    );
    return result.rows[0] || null;
  },

  remove: async (evidencia_id) => {
    const result = await pool.query(
      'DELETE FROM evidencia WHERE evidencia_id = $1 RETURNING *',
      [evidencia_id]
    );
    return result.rows[0] || null;
  },
};

export default Evidencia;
