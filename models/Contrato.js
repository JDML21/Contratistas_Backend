import pool from '../config/db.js';

const Contrato = {
  findById: async (contrato_id) => {
    const result = await pool.query(
      'SELECT * FROM contrato WHERE contrato_id = $1',
      [contrato_id]
    );
    return result.rows[0] || null;
  },

  findAll: async () => {
    const result = await pool.query(
      'SELECT * FROM contrato ORDER BY created_at DESC'
    );
    return result.rows;
  },

  create: async ({ duracion_semanas, valor_total, fecha_inicio, estado = 'Borrador', url = null }) => {
    const result = await pool.query(
      `INSERT INTO contrato (duracion_semanas, valor_total, fecha_inicio, estado, url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [duracion_semanas, valor_total, fecha_inicio, estado, url]
    );
    return result.rows[0];
  },

  update: async (contrato_id, campos) => {
    const { duracion_semanas, valor_total, fecha_inicio, estado, url } = campos;
    const result = await pool.query(
      `UPDATE contrato
       SET duracion_semanas = COALESCE($1, duracion_semanas),
           valor_total      = COALESCE($2, valor_total),
           fecha_inicio     = COALESCE($3, fecha_inicio),
           estado           = COALESCE($4, estado),
           url              = COALESCE($5, url)
       WHERE contrato_id = $6
       RETURNING *`,
      [duracion_semanas, valor_total, fecha_inicio, estado, url, contrato_id]
    );
    return result.rows[0] || null;
  },

  remove: async (contrato_id) => {
    const result = await pool.query(
      'DELETE FROM contrato WHERE contrato_id = $1 RETURNING *',
      [contrato_id]
    );
    return result.rows[0] || null;
  },
};

export default Contrato;
