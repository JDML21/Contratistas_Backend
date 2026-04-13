import pool from '../config/db.js';

const Solicitud = {
  findById: async (solicitud_id) => {
    const result = await pool.query(
      'SELECT * FROM solicitud WHERE solicitud_id = $1',
      [solicitud_id]
    );
    return result.rows[0] || null;
  },

  findByContrato: async (contrato_id) => {
    const result = await pool.query(
      'SELECT * FROM solicitud WHERE contrato_id = $1 ORDER BY created_at DESC',
      [contrato_id]
    );
    return result.rows;
  },

  findAll: async () => {
    const result = await pool.query(
      'SELECT * FROM solicitud ORDER BY created_at DESC'
    );
    return result.rows;
  },

  // Solicitudes de los contratos en los que el usuario participa con el tipo_actor dado.
  // Incluye el nombre del primer contratista del contrato para facilitar la vista del supervisor.
  findByUsuario: async (usuario_id, tipo_actor) => {
    const result = await pool.query(
      `SELECT s.*,
         (
           SELECT u.nombre
           FROM actores_contrato ac2
           JOIN usuario u ON u.usuario_id = ac2.usuario_id
           WHERE ac2.contrato_id = s.contrato_id AND ac2.tipo_actor = 'Contratista'
           LIMIT 1
         ) AS nombre_contratista
       FROM solicitud s
       JOIN actores_contrato ac
         ON ac.contrato_id = s.contrato_id
         AND ac.usuario_id = $1
         AND ac.tipo_actor = $2
       ORDER BY s.created_at DESC`,
      [usuario_id, tipo_actor]
    );
    return result.rows;
  },

  create: async ({ contrato_id, estado = 'Pendiente', comentario = null, planilla_id = null }) => {
    const result = await pool.query(
      `INSERT INTO solicitud (contrato_id, estado, comentario, planilla_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [contrato_id, estado, comentario, planilla_id]
    );
    return result.rows[0];
  },

  update: async (solicitud_id, campos) => {
    const { estado, comentario, planilla_id } = campos;
    const result = await pool.query(
      `UPDATE solicitud
       SET estado      = COALESCE($1, estado),
           comentario  = COALESCE($2, comentario),
           planilla_id = COALESCE($3, planilla_id)
       WHERE solicitud_id = $4
       RETURNING *`,
      [estado, comentario, planilla_id, solicitud_id]
    );
    return result.rows[0] || null;
  },

  remove: async (solicitud_id) => {
    const result = await pool.query(
      'DELETE FROM solicitud WHERE solicitud_id = $1 RETURNING *',
      [solicitud_id]
    );
    return result.rows[0] || null;
  },
};

export default Solicitud;
