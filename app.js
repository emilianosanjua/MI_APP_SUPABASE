// 1. Importar la librería desde una URL (CDN) para que funcione en el navegador
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 2. Tus credenciales (las mismas que usaste en index.js)
const supabaseUrl = 'https://ulktigzkowfmhuxjjzvh.supabase.co'
const supabaseKey = 'sb_publishable_24whM4QqaVjBtQm4WGylew_QH9J5Db8'
const supabase = createClient(supabaseUrl, supabaseKey)

// 3. Función para registrar nuevos usuarios (Botón Registrar)
async function registrarUsuario() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email || !password) {
        alert("Por favor, llena todos los campos.");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        alert("Error al registrar: " + error.message)
    } else {
        alert("¡Registro exitoso! Revisa tu correo o intenta iniciar sesión.")
    }
}

// 4. Función para entrar al sistema (Botón Entrar)
async function iniciarSesion() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        alert("Error al entrar: " + error.message)
    } else {
        alert("¡Bienvenido al sistema!")
        
        // Manipulación del DOM: Mostrar formulario de estudiantes y ocultar login
        document.getElementById('seccion-estudiantes').style.display = 'block'
        document.getElementById('email').style.display = 'none'
        document.getElementById('password').style.display = 'none'
        
        // Ocultamos también los encabezados de login para que se vea limpio
        document.querySelector('h2').innerText = "Panel de Administración"
    }
}

// 5. Función para Guardar Estudiante en la Tabla
async function guardarEstudiante() {
    const nombre = document.getElementById('nombreEstudiante').value
    const carrera = document.getElementById('carreraEstudiante').value

    if (!nombre || !carrera) {
        alert("Por favor, llena todos los campos.")
        return
    }

    // Petición INSERT a la base de datos (con RLS desactivada)
    const { data, error } = await supabase
        .from('estudiantes')
        .insert([
            { nombre: nombre, carrera: carrera }
        ])
        .select()

    if (error) {
        console.error("Error:", error)
        alert("Error al guardar en la base de datos.")
    } else {
        alert("¡Estudiante registrado con éxito!")
        // Limpiar inputs después del éxito
        document.getElementById('nombreEstudiante').value = ''
        document.getElementById('carreraEstudiante').value = ''
    }
}

// 4. Exponer funciones al objeto Window (Necesario por usar type="module")
window.iniciarSesion = iniciarSesion
window.guardarEstudiante = guardarEstudiante