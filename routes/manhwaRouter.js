import express from 'express';

import {
    obtenerManhwas,
    obtenerManhwaPorId,
    obtenerManwhasPorGenero,
    obtenerManhwasPorTitulo,
    agregarManhwa,
    actualizarEstado,
    eliminarManhwa
} from '../controllers/manhwaController.js';

const manhwaRouter = express.Router();

// Obtener todos
manhwaRouter.get('/', obtenerManhwas);

// Obtener por género
manhwaRouter.get('/genero/:genero', obtenerManwhasPorGenero);

// Obtener por título
manhwaRouter.get('/titulo/:titulo', obtenerManhwasPorTitulo);

// Obtener por ID
manhwaRouter.get('/:id', obtenerManhwaPorId);

// Agregar manhwa
manhwaRouter.post('/', agregarManhwa);

// Actualizar estado
manhwaRouter.patch('/:id', actualizarEstado);

// Eliminar manhwa
manhwaRouter.delete('/:id', eliminarManhwa);

export default manhwaRouter;