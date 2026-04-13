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

  // Contratos en los que participa un usuario con un tipo_actor específico.
  // Incluye las actividades del contrato agregadas como JSON array.
  findByUsuario: async (usuario_id, tipo_actor) => {
    const result = await pool.query(
      `SELECT c.*,
         COALESCE(
           json_agg(
             json_build_object('actividad_id', a.actividad_id, 'nombre', a.nombre)
             ORDER BY a.created_at
           ) FILTER (WHERE a.actividad_id IS NOT NULL),
           '[]'::json
         ) AS actividades
       FROM contrato c
       JOIN actores_contrato ac
         ON ac.contrato_id = c.contrato_id
         AND ac.usuario_id = $1
         AND ac.tipo_actor = $2
       LEFT JOIN actividad a ON a.contrato_id = c.contrato_id
       GROUP BY c.contrato_id
       ORDER BY c.created_at DESC`,
      [usuario_id, tipo_actor]
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
