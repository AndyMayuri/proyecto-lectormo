import {
    busquedaManwhaPorId, 
    nuevoId,
    validarCamposUsuario,
    busquedaManwhaPorGenero, 
    busquedaManwhaPorTitulo
} from '../logica.js'
import {manhwas} from '../data/datos.js'
import {usuarios} from '../data/usuarios.js'

//Crear una nueva cuenta
export function agregarNuevoUsuario(req, res) {
    const validacion = validarCamposUsuario(req.body, usuarios);
    if (!validacion.valido) {
        return res.status(400).json({
            mensaje: "No se pudo crear el usuario",
            errores: validacion.errores
        });
    }
    const id = nuevoId(usuarios);
    const nuevoUsuario = {
        id: id,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        biblioteca: [],
        meGusta: []
    };

    usuarios.push(nuevoUsuario);

    const { password, ...usuarioSinPassword } = nuevoUsuario;

    return res.status(201).json(usuarioSinPassword);
}

export function inicioSesion(req, res){
    req.body.nombre
    req.body.email
}