import {busquedaManwhaPorId, nuevoId, busquedaManwhaPorGenero, busquedaManwhaPorTitulo} from '../logica.js'
import {manhwas} from '../data/datos.js'


// Obtener todos los manhwas
export function obtenerManhwas(req, res) {
    return res.status(200).json(manhwas);
}

// Obtener manhwa por ID
export function obtenerManhwaPorId(req, res) {
    const id = Number(req.params.id);

    const manhwaEncontrado = busquedaManwhaPorId(manhwas, id);

    if (manhwaEncontrado === null) {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
    }

    return res.status(200).json(manhwaEncontrado);
}

// Obtener manhwas por género
export function obtenerManwhasPorGenero(req, res) {
    const genero = req.params.genero;

    const manhwasEncontrados =
        busquedaManwhaPorGenero(manhwas, genero);

    if (manhwasEncontrados.length === 0) {
        return res.status(404).json({
            mensaje: 'No se encontraron manhwas de ese género'
        });
    }

    return res.status(200).json(manhwasEncontrados);
}

// Obtener manhwas por título
export function obtenerManhwasPorTitulo(req, res) {
    const titulo = req.params.titulo;

    const manhwasEncontrados =
        busquedaManwhaPorTitulo(manhwas, titulo);

    if (manhwasEncontrados.length === 0) {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
    }

    return res.status(200).json(manhwasEncontrados);
}

// Agregar un manhwa
export function agregarManhwa(req, res) {
    const id = nuevoId(manhwas);

    const nuevoManhwa = {
        id: id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        estado: req.body.estado,
        capitulos: req.body.capitulos,
        genero: req.body.genero
    };

    manhwas.push(nuevoManhwa);

    return res.status(201).json(nuevoManhwa);
}

// Actualizar estado
export function actualizarEstado(req, res) {
    const id = Number(req.params.id);

    const manhwaEncontrado = busquedaManwhaPorId(manhwas, id);

    if (manhwaEncontrado === null) {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
    }

    if (!req.body.estado) {
        return res.status(400).json({
            mensaje: 'Debe proporcionar un estado'
        });
    }

    manhwaEncontrado.estado = req.body.estado;

    return res.status(200).json(manhwaEncontrado);
}

// Eliminar manhwa
export function eliminarManhwa(req, res) {
    const id = Number(req.params.id);

    const manhwaEncontrado = busquedaManwhaPorId(manhwas, id);

    if (manhwaEncontrado === null) {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
    }

    const indice = manhwas.indexOf(manhwaEncontrado);

    manhwas.splice(indice, 1);

    return res.status(204).end();
}