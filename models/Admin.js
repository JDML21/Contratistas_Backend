import pool from '../config/db.js';

const Admin = {
  findByUsuarioId: async (usuario_id) => {
    const result = await pool.query(
      'SELECT * FROM admin WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows[0] || null;
  },
};

export default Admin;
