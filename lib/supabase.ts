import { createClient } from "@supabase/supabase-js";

// Obtenemos las variables de entorno, usando as string para que TypeScript no marque error.
// Si no encuentra la variable, le pasamos un string vacío para que la app no crashee inmediatamente al compilar.
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);