import express from 'express';

import {agregarNuevoUsuario, inicioSesion, verPerfil} from '../controllers/usuarioController.js';

const usuarioRouter = express.Router();

usuarioRouter.post('/registro', agregarNuevoUsuario);

usuarioRouter.post('/login', inicioSesion);

usuarioRouter.get('/perfil', verPerfil);

export default usuarioRouter;