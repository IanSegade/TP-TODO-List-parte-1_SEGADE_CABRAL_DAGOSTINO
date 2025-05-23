let t = localStorage.getItem("t") ? parseInt(localStorage.getItem("t")) : 0;
let listaCompleta = localStorage.getItem("listaCompleta") ? JSON.parse(localStorage.getItem("listaCompleta")) : [];

document.addEventListener("DOMContentLoaded", mostrarLista);

function agregarTarea() {
    let texto = document.getElementById('agregar').value;

    if (texto.trim() === "") return;

    listaCompleta.push({
        id: t,
        texto: texto,
        completada: false,
        fecha: new Date().toLocaleDateString()
    });

    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    localStorage.setItem("t", t + 1);

    t++;
    document.getElementById('agregar').value = "";
    mostrarLista();
}

function eliminarTarea(id) {
    listaCompleta = listaCompleta.filter(tarea => tarea.id !== id);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function eliminarCompletados() {
    listaCompleta = listaCompleta.filter(tarea => !tarea.completada);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function marcarComoCompletado(id) {
    listaCompleta = listaCompleta.map(tarea => tarea.id === id ? { ...tarea, completada: true } : tarea);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function mostrarLista() {
    let listaHTML = document.getElementById("listaTareas");
    listaHTML.innerHTML = "";

    let todasCompletadas = true;

    listaCompleta.forEach(tarea => {
        let lista = document.createElement("li");

        let contenedorTarea = document.createElement("div");
        contenedorTarea.classList.add("tarea-contenedor");

        let textoTarea = document.createElement("span");
        textoTarea.classList.add("nombre-tarea");
        textoTarea.innerHTML = tarea.texto;
        
        let fechaTarea = document.createElement("span");
        fechaTarea.classList.add("fecha-tarea");
        fechaTarea.innerHTML = tarea.fecha;

        contenedorTarea.appendChild(textoTarea);
        contenedorTarea.appendChild(fechaTarea);

        if (tarea.completada) {
            textoTarea.style.textDecoration = "line-through";
        } else {
            textoTarea.style.textDecoration = "none";
        }

        let botonCompletado = document.createElement("button");
        botonCompletado.innerHTML = "Completado";
        botonCompletado.onclick = () => marcarComoCompletado(tarea.id);

        let botonBorrar = document.createElement("button");
        botonBorrar.innerHTML = "Borrar tarea";
        botonBorrar.onclick = () => eliminarTarea(tarea.id);

        lista.appendChild(contenedorTarea);
        lista.appendChild(botonCompletado);
        lista.appendChild(botonBorrar);

        if (!tarea.completada) {
            todasCompletadas = false;
        }

        listaHTML.appendChild(lista);
    });

    if (todasCompletadas) {
        document.body.classList.add('todas-completadas');
    } else {
        document.body.classList.remove('todas-completadas');
    }

}