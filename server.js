import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes        from './routes/auth.js';
import contratosRoutes   from './routes/contratos.js';
import actoresRoutes     from './routes/actores.js';
import actividadesRoutes from './routes/actividades.js';
import planillasRoutes   from './routes/planillas.js';
import solicitudesRoutes from './routes/solicitudes.js';
import evidenciasRoutes  from './routes/evidencias.js';
import pool, { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth',        authRoutes);
app.use('/api/contratos',   contratosRoutes);
app.use('/api/actores',     actoresRoutes);
app.use('/api/actividades', actividadesRoutes);
app.use('/api/planillas',   planillasRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/evidencias',  evidenciasRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend está funcionando correctamente', db: 'Supabase PostgreSQL' });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS hora_actual, version() AS version_postgresql');
    res.json({ success: true, datos: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
});
