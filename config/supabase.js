import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan las credenciales de Supabase');
}

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);


export function crearClienteAutenticado(token) {
    return createClient(
        supabaseUrl,
        supabaseKey,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );
}