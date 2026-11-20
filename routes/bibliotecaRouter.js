import express from 'express';

import { verificarToken } from '../middlewares/verificarToken.js';

import {
    obtenerBiblioteca,
    agregarManhwaBiblioteca,
    eliminarManhwaBiblioteca
} from '../controllers/bibliotecaController.js';

const bibliotecaRouter = express.Router();

bibliotecaRouter.get('/', verificarToken, obtenerBiblioteca);

bibliotecaRouter.post('/:manhwaId', verificarToken, agregarManhwaBiblioteca);
bibliotecaRouter.delete('/:manhwaId', verificarToken, eliminarManhwaBiblioteca);
export default bibliotecaRouter;
