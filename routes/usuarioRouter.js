import express from 'express';

import {agregarNuevoUsuario} from '../controllers/usuarioController.js';

const usuarioRouter = express.Router();

usuarioRouter.post('/', agregarNuevoUsuario);

export default usuarioRouter;