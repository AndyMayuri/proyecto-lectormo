import express from 'express';

const app = express();
app.use(express.json());
const manhwaRouter = express.Router();

app.use('/api/manhwas', manhwaRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a OlympusScan');
});

const manhwas = [
    {
        id: 1,
        titulo: 'Solo Leveling',
        autor: 'Chugong',
        estado: 'Finalizado',
        capitulos: 200
    },

    {
        id: 2,
        titulo: 'The Beginning After The End',
        autor: 'TurtleMe',
        estado: 'En emisión',
        capitulos: 220
    }
];

manhwaRouter.get('/', (req, res) => {
    res.json(manhwas)
});

function busquedaManwha(manhwa, id){
    const cantManhwas = manhwa.length
    let contador = 0
    while (contador < cantManhwas){
        if (manhwa[contador].id === id){
            return manhwa[contador]
        }
        contador += 1
    }
    return null
}

function nuevoId(manhwas){
    let nuevoID = manhwas[manhwas.length - 1].id + 1
    return nuevoID
}


manhwaRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const manhwaEncontrado = busquedaManwha(manhwas, id)

    if (manhwaEncontrado === null) {
        return res.status(404).json({mensaje: 'Manhwa no encontrado'});
    }

    res.json(manhwaEncontrado);
});

manhwaRouter.post('/', (req, res) => {
    let id = nuevoId(manhwas)
    //verificaciones de campos vacios
    const nuevoManhwa = {
        id: id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        estado: req.body.estado,
        capitulos: req.body.capitulos
    };
    manhwas.push(nuevoManhwa);
    res.status(201).json(nuevoManhwa);
});

//actualizacion de estado

manhwaRouter.patch('/', (req, res) => {
    const id = Number(req.body.id);
    const manhwaEncontrado = busquedaManwha(manhwas, id)

    if (manhwaEncontrado === null) {
        return res.status(404).json({mensaje: 'Manhwa no encontrado'});
    }

    if (!req.body.estado) {
        return res.status(400).json({mensaje: 'Debe proporcionar un estado'});
    }

    manhwaEncontrado.estado = req.body.estado;
    return res.status(200).json(manhwaEncontrado);
});

//borrar un manhwa por id

manhwaRouter.delete('/',(req, res) => {
    const id = Number(req.params.id);
    const manhwaEncontrado = busquedaManwha(manhwas, id);

    if (manhwaEncontrado === null) {
        return res.status(404).json({mensaje: 'Manhwa no encontrado'});
    }
    
    const indice = manhwas.indexOf(manhwaEncontrado);
    manhwas.splice(indice, 1);

    return res.status(204).end();
});


app.get('/', (req, res) => {
    res.send('Bienvenido a Olympus API');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

