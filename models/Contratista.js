import pool from '../config/db.js';

const Contratista = {
  findByUsuarioId: async (usuario_id) => {
    const result = await pool.query(
      'SELECT * FROM contratista WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows[0] || null;
  },

  update: async (usuario_id, campos) => {
    const { cuenta_bancaria, tipo_empresa } = campos;
    const result = await pool.query(
      `UPDATE contratista
       SET cuenta_bancaria = COALESCE($1, cuenta_bancaria),
           tipo_empresa    = COALESCE($2, tipo_empresa)
       WHERE usuario_id = $3
       RETURNING *`,
      [cuenta_bancaria, tipo_empresa, usuario_id]
    );
    return result.rows[0] || null;
  },
};

export default Contratista;
