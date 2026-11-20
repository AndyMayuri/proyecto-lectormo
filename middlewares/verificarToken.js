import { supabase } from '../config/supabase.js';

export async function verificarToken(req, res, next) {

    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: 'No se proporcionó un token'
        });
    }

    // Separar Bearer del token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            mensaje: 'Token no proporcionado'
        });
    }

    // Verificar el token con Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }

    // Guardar el usuario autenticado en la petición
    req.usuario = data.user;

    next();
}
