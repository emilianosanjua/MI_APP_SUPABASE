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
        alert("Acceso denegado: " + error.message)
    } else {
        alert("¡Bienvenido al sistema!")
        // Aquí podrías redirigir a otra página o limpiar el formulario
        console.log("Usuario logueado:", data.user)
    }
}

// 5. Exponemos las funciones para que el HTML pueda verlas
window.registrarUsuario = registrarUsuario;
window.iniciarSesion = iniciarSesion;