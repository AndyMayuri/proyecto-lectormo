
import { crearClienteAutenticado } from '../config/supabase.js';

// Obtener biblioteca del usuario autenticado
export async function obtenerBiblioteca(req, res) {

    const token = req.headers.authorization.split(' ')[1];

    const supabaseUsuario = crearClienteAutenticado(token);

    const { data, error } = await supabaseUsuario
        .from('biblioteca')
        .select(`
            manhwa_id,
            agregado_en,
            manhwas (*)
        `);

    if (error) {
        return res.status(500).json({
            mensaje: 'No se pudo obtener la biblioteca',
            error: error.message
        });
    }

    return res.status(200).json({
        mensaje: 'Biblioteca obtenida correctamente',
        biblioteca: data
    });
}


// Agregar un manhwa a la biblioteca
export async function agregarManhwaBiblioteca(req, res){
    const manhwaId = Number(req.params.manhwaId)

    const usuarioId = req.usuario.id

    // Validar el ID del manhwa
    if (!Number.isInteger(manhwaId) || manhwaId <= 0) {
        return res.status(400).json({
            mensaje: 'El ID del manhwa no es válido'
        });
    }
    // Crear cliente autenticado
    const token = req.headers.authorization.split(' ')[1];
    const supabaseUsuario = crearClienteAutenticado(token);

    // Insertar en la biblioteca
    const { data, error } = await supabaseUsuario
        .from('biblioteca')
        .insert({
            usuario_id: usuarioId,
            manhwa_id: manhwaId
        })
        .select()
        .single();

    // Manejar errores
    if (error) {

        // El manhwa ya está en la biblioteca
        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'Este manhwa ya está en tu biblioteca'
            });
        }

        // El manhwa no existe
        if (error.code === '23503') {
            return res.status(404).json({
                mensaje: 'El manhwa no existe'
            });
        }

        return res.status(500).json({
            mensaje: 'No se pudo agregar el manhwa',
            error: error.message
        });
    }

    return res.status(201).json({
        mensaje: 'Manhwa agregado correctamente',
        manhwa: data
    });


}


//Eliminar manhwa por ID
export async function eliminarManhwaBiblioteca(req, res) {
    const manhwaId = Number(req.params.manhwaId);
    const usuarioId = req.usuario.id;

    // Validar el ID
    if (!Number.isInteger(manhwaId) || manhwaId <= 0) {
        return res.status(400).json({
            mensaje: 'El ID del manhwa no es válido'
        });
    }

    // Crear cliente autenticado
    const token = req.headers.authorization.split(' ')[1];
    const supabaseUsuario = crearClienteAutenticado(token);

    // Eliminar el manhwa de la biblioteca
    const { data, error } = await supabaseUsuario
        .from('biblioteca')
        .delete()
        .eq('usuario_id', usuarioId)
        .eq('manhwa_id', manhwaId)
        .select()
        .maybeSingle();

    if (error) {
        return res.status(500).json({
            mensaje: 'No se pudo eliminar el manhwa',
            error: error.message
        });
    }

    if (!data) {
        return res.status(404).json({
            mensaje: 'El manhwa no está en tu biblioteca'
        });
    }

    return res.status(200).json({
        mensaje: 'Manhwa eliminado correctamente',
        manhwa: data
    });
}