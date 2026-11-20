import {
    busquedaManwhaPorId, 
    nuevoId,
    validarCamposUsuario,
    busquedaManwhaPorGenero, 
    busquedaManwhaPorTitulo
} from '../utilities/logica.js'
import {manhwas} from '../data/datos.js'
import {usuarios} from '../data/usuarios.js'


import { supabase } from '../config/supabase.js';

// Crear una nueva cuenta
export async function agregarNuevoUsuario(req, res) {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nombre: nombre
            }
        }
    });

    if (error) {
        return res.status(400).json({
            mensaje: 'No se pudo crear el usuario',
            error: error.message
        });
    }

    return res.status(201).json({
        mensaje: 'Usuario registrado correctamente',
        usuario: {
            id: data.user.id,
            nombre: data.user.user_metadata.nombre,
            email: data.user.email
        }
    });
}



// Iniciar sesión
export async function inicioSesion(req, res) {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Validar campos
    if (!email || !password) {
        return res.status(400).json({
            mensaje: 'Email y contraseña son obligatorios'
        });
    }

    // Autenticar con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(401).json({
            mensaje: 'No se pudo iniciar sesión',
            error: error.message
        });
    }

    return res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        usuario: {
            id: data.user.id,
            nombre: data.user.user_metadata.nombre,
            email: data.user.email
        },
        sesion: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_in: data.session.expires_in
        }
    });
}
