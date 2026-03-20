import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase en la nube siempre requiere conexión segura (SSL)
  ssl: { rejectUnauthorized: false }
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(`✓ Base de Datos conectada vía PostgreSQL!`);
    client.release();
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
    process.exit(1);
  }
};

export default pool;
