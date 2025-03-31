
let t = localStorage.getItem("t") ? parseInt(localStorage.getItem("t")) : 0;
let listaCompleta = localStorage.getItem("listaCompleta")? JSON.parse(localStorage.getItem("listaCompleta")): [];

document.addEventListener("DOMContentLoaded", mostrarLista);

function agregarTarea() 
{
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

function eliminarTarea(id) 
{
    listaCompleta = listaCompleta.filter(tarea => tarea.id !== id);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function eliminarCompletados() 
{
    listaCompleta = listaCompleta.filter(tarea => !tarea.completada);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function marcarComoCompletado(id) 
{
    listaCompleta = listaCompleta.map(tarea =>tarea.id === id ? { ...tarea, completada: true } : tarea);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function mostrarLista() 
{
    let listaHTML = document.getElementById("listaTareas");
    listaHTML.innerHTML = "";

    listaCompleta.forEach(tarea => {let lista = document.createElement("lista")
    lista.innerHTML = `${tarea.texto} - ${tarea.fecha}
    <button onclick="marcarComoCompletado(${tarea.id})">Completado</button>
    <button onclick="eliminarTarea(${tarea.id})">Borrar tarea</button>`;
    lista.style.textDecoration = tarea.completada ? "line-through" : "none";
    listaHTML.appendChild(lista);
    });
}