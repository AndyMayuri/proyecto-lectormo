import express from 'express';

import manhwaRouter from './routes/manhwaRouter.js';
import usuarioRouter from './routes/usuarioRouter.js';

const app = express();

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a OlympusScan');
});

// Rutas de la API
app.use('/api/manhwas', manhwaRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});