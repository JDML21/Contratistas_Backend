import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a PostgreSQL en Supabase
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

import pool from './config/db.js';

// Ruta de salud básica
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend está funcionando correctamente', db: 'Supabase PostgreSQL' });
});

// Ruta para probar que podemos leer de Supabase
app.get('/api/test-db', async (req, res) => {
  try {
    // Intentamos hacer una consulta súper básica a PostgreSQL
    const result = await pool.query('SELECT NOW() AS hora_actual, version() AS version_postgresql');
    res.json({
      success: true,
      mensaje: '¡Tu base de datos está respondiendo perfectamente! 🚀',
      datos: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
});
