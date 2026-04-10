import pool from '../config/db.js';

const Supervisor = {
  findByUsuarioId: async (usuario_id) => {
    const result = await pool.query(
      'SELECT * FROM supervisor WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows[0] || null;
  },

  update: async (usuario_id, campos) => {
    const { salario } = campos;
    const result = await pool.query(
      `UPDATE supervisor
       SET salario = COALESCE($1, salario)
       WHERE usuario_id = $2
       RETURNING *`,
      [salario, usuario_id]
    );
    return result.rows[0] || null;
  },
};

export default Supervisor;
