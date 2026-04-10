import pool from '../config/db.js';

const Gerente = {
  findByUsuarioId: async (usuario_id) => {
    const result = await pool.query(
      'SELECT * FROM gerente WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows[0] || null;
  },

  update: async (usuario_id, campos) => {
    const { duracion_empresa } = campos;
    const result = await pool.query(
      `UPDATE gerente
       SET duracion_empresa = COALESCE($1, duracion_empresa)
       WHERE usuario_id = $2
       RETURNING *`,
      [duracion_empresa, usuario_id]
    );
    return result.rows[0] || null;
  },
};

export default Gerente;
