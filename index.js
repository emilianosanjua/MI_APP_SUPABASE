import { createClient } from '@supabase/supabase-js'

// Reemplaza con tus credenciales de Supabase
const supabaseUrl = 'https://ulktigzkowfmhuxjjzvh.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_24whM4QqaVjBtQm4WGylew_QH9J5Db8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function obtenerEstudiantes() {
    const { data, error } = await supabase
        .from('estudiantes')
        .select('*')

    if (error) {
        console.log('Error:', error)
    } else {
        console.log('Datos:', data)
    }
}

obtenerEstudiantes()