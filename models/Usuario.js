import pool from '../config/db.js';

const usuarioModel = {
  // Busca por correo o usuario_id
  findOne: async (query) => {
    let result;
    if (query.correo) {
      result = await pool.query(
        'SELECT * FROM usuario WHERE correo = $1 LIMIT 1',
        [query.correo]
      );
    } else if (query.usuario_id) {
      result = await pool.query(
        'SELECT * FROM usuario WHERE usuario_id = $1 LIMIT 1',
        [query.usuario_id]
      );
    } else {
      return null;
    }
    return result.rows[0] || null;
  },

  // Campos requeridos: correo, contrasena_hash, identificacion, nombre
  // Opcional: tipo_documento
  create: async (datos) => {
    const { correo, contrasena_hash, identificacion, nombre, tipo_documento = null } = datos;
    const result = await pool.query(
      `INSERT INTO usuario (correo, contrasena_hash, identificacion, nombre, tipo_documento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [correo, contrasena_hash, identificacion, nombre, tipo_documento]
    );
    return result.rows[0];
  },
};

export default usuarioModel;
