import jwt from 'jsonwebtoken';

// Access token (corto)
export const generateAccessToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

// Refresh token (largo)
export const generateRefreshToken = (usuario) => {
    return jwt.sign(
        { id: usuario.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};