import {busquedaManwhaPorId, nuevoId, busquedaManwhaPorGenero, busquedaManwhaPorTitulo} from '../utilities/logica.js'
import { supabase } from '../config/supabase.js';

// Obtener todos los manhwas
export async function obtenerManhwas(req, res) {
    
    const { data, error } = await supabase
        .from('manhwas')
        .select('*');

    if (error) {
        return res.status(500).json({
            mensaje: 'Error al obtener los manhwas',
            error: error.message
        });
    }

    return res.status(200).json(data);
}

// Obtener manhwa por ID
export async function obtenerManhwaPorId(req, res) {
    const id = Number(req.params.id);

    const { data, error } = await supabase
        .from('manhwas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
        }

        return res.status(500).json({
            mensaje: 'Error al consultar el manhwa',
            error: error.message
        });
    }

    return res.status(200).json(data);
}

// Obtener manhwas por género
export async function obtenerManwhasPorGenero(req, res) {
    const genero = req.params.genero;

    const { data, error } = await supabase
        .from('manhwas')
        .select('*')
        .contains('genero', [genero]);

    if (error) {
        return res.status(500).json({
            mensaje: 'Error al consultar los manhwas',
            error: error.message
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            mensaje: 'No se encontraron manhwas con ese género'
        });
    }

    return res.status(200).json(data);
}
// Obtener manhwas por título
export async function obtenerManhwasPorTitulo(req, res) {
    const titulo = req.params.titulo;

    const { data, error } = await supabase
        .from('manhwas')
        .select('*')
        .ilike('titulo', `%${titulo}%`);

    if (error) {
        return res.status(500).json({
            mensaje: 'Error al consultar los manhwas',
            error: error.message
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            mensaje: 'Manhwa no encontrado'
        });
    }

    return res.status(200).json(data);
}

// Agregar un manhwa
export async function agregarManhwa(req, res) {
    const nuevoManhwa = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        estado: req.body.estado,
        capitulos: req.body.capitulos,
        genero: req.body.genero
    };

    const { data, error } = await supabase
        .from('manhwas')
        .insert([nuevoManhwa])
        .select()
        .single();
    if (error) {
        return res.status(500).json({
            mensaje: 'Error al agregar el manhwa',
            error: error.message
            });
    }

    return res.status(201).json(data);
}


// Actualizar estado
export async function actualizarEstado(req, res) {
    const id = Number(req.params.id);

    if (!req.body.estado) {
        return res.status(400).json({
            mensaje: 'Debe proporcionar un estado'
        });
    }

    const { data, error } = await supabase
        .from('manhwas')
        .update({ estado: req.body.estado })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return res.status(404).json({
                mensaje: 'Manhwa no encontrado'
            });
        }

        return res.status(500).json({
            mensaje: 'Error al actualizar el manhwa',
            error: error.message
        });
    }

    return res.status(200).json(data);
}

// Eliminar manhwa
export async function eliminarManhwa(req, res) {
    const id = Number(req.params.id);

    const { data, error } = await supabase
        .from('manhwas')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return res.status(404).json({
                mensaje: 'Manhwa no encontrado'
            });
        }

        return res.status(500).json({
            mensaje: 'Error al eliminar el manhwa',
            error: error.message
        });
    }

    return res.status(204).end();
}
