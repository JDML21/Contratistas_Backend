import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../db.json');

// Leer BD desde JSON
const leerDB = () => {
  try {
    const datos = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(datos);
  } catch (error) {
    console.error('Error leyendo db.json:', error);
    return { usuarios: [] };
  }
};

// Escribir BD en JSON
const guardarDB = (datos) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(datos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error escribiendo db.json:', error);
  }
};

// Simulación de modelo Usuario
const usuarioModel = {
  findOne: async (query) => {
    const bd = leerDB();
    const usuario = bd.usuarios.find(u => {
      if (query.email) return u.email === query.email;
      if (query.id) return u.id === query.id;
      return false;
    });
    return usuario || null;
  },

  create: async (datos) => {
    const bd = leerDB();
    const nuevoID = Math.max(...bd.usuarios.map(u => u.id), 0) + 1;
    const nuevoUsuario = {
      id: nuevoID,
      ...datos,
      createdAt: new Date().toISOString(),
    };
    bd.usuarios.push(nuevoUsuario);
    guardarDB(bd);
    return nuevoUsuario;
  },
};

export default usuarioModel;
