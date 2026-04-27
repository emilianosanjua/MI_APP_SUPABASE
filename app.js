// 1. Importar la librería desde una URL (CDN) para que funcione en el navegador
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 2. Tus credenciales (las mismas que usaste en index.js)
const supabaseUrl = 'https://ulktigzkowfmhuxjjzvh.supabase.co'
const supabaseKey = 'sb_publishable_24whM4QqaVjBtQm4WGylew_QH9J5Db8'
const supabase = createClient(supabaseUrl, supabaseKey)

// 3. Función para guardar un objeto en el inventario
async function agregarAlInventario() {
    const nombre = document.getElementById('nombreProducto').value
    const cantidad = document.getElementById('cantidad').value

    if (!nombre || !cantidad) {
        alert("Por favor llena todos los campos");
        return;
    }

    const { data, error } = await supabase
        .from('inventario')
        .insert([{ nombre: nombre, cantidad: parseInt(cantidad) }])
        .select()

    if (error) {
        console.error('Error al guardar:', error)
        alert('Hubo un error al guardar')
    } else {
        console.log('Guardado con éxito:', data)
        alert('¡Producto guardado en el inventario!')
        // Limpiar campos
        document.getElementById('nombreProducto').value = ''
        document.getElementById('cantidad').value = ''
    }
}

// Hacer la función accesible desde el HTML
window.agregarAlInventario = agregarAlInventario;