import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import pool from '../config/db.js';

const ROLES_VALIDOS = ['contratista', 'supervisor', 'gerente', 'admin'];

// Consulta las sub-tablas para determinar el rol del usuario
const detectarRol = async (usuario_id) => {
  const result = await pool.query(
    `SELECT 'contratista' AS rol FROM contratista WHERE usuario_id = $1
     UNION ALL
     SELECT 'supervisor'  FROM supervisor  WHERE usuario_id = $1
     UNION ALL
     SELECT 'gerente'     FROM gerente     WHERE usuario_id = $1
     UNION ALL
     SELECT 'admin'       FROM admin       WHERE usuario_id = $1
     LIMIT 1`,
    [usuario_id]
  );
  return result.rows[0]?.rol || null;
};

const generarToken = (usuarioId, rol) => {
  return jwt.sign({ id: usuarioId, rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'correo y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const esValida = await bcrypt.compare(password, usuario.contrasena_hash);
    if (!esValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const rol = await detectarRol(usuario.usuario_id);
    if (!rol) {
      return res.status(403).json({ error: 'Usuario sin rol asignado' });
    }

    const token = generarToken(usuario.usuario_id, rol);

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: usuario.usuario_id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ usuario_id: req.usuario.id });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { contrasena_hash, ...datos } = usuario;
    res.json({ user: { ...datos, rol: req.usuario.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { correo, password, identificacion, nombre, tipo_documento, rol } = req.body;

    if (!correo || !password || !identificacion || !nombre || !rol) {
      return res.status(400).json({
        error: 'correo, password, identificacion, nombre y rol son requeridos',
      });
    }

    if (!ROLES_VALIDOS.includes(rol)) {
      return res.status(400).json({
        error: `rol debe ser uno de: ${ROLES_VALIDOS.join(', ')}`,
      });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const contrasena_hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      correo,
      contrasena_hash,
      identificacion,
      nombre,
      tipo_documento,
    });

    // Insertar en la sub-tabla del rol correspondiente
    const subResult = await pool.query(
      `INSERT INTO ${rol} (usuario_id) VALUES ($1)`,
      [nuevoUsuario.usuario_id]
    );

    const token = generarToken(nuevoUsuario.usuario_id, rol);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: nuevoUsuario.usuario_id,
        correo: nuevoUsuario.correo,
        nombre: nuevoUsuario.nombre,
        rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
