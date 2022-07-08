const listaCursos = document.querySelector("#lista-cursos")
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciar = document.querySelector("#vaciar-carrito")
let contenedor = []

esperaEventListeners()
function esperaEventListeners(){
    listaCursos.addEventListener('click', agregarACarrito)
    carrito.addEventListener("click", eliminarCurso)
    vaciar.addEventListener("click",() => {
        vaciarCarrito()
        contenedor = []
    })
    document.addEventListener("DOMContentLoaded",() =>{
        // if (localStorage.getItem("carrito") != null){
        //     contenedor = JSON.parse(localStorage.getItem("carrito"))
        // }else{
        //     contenedor = []
        // }
        contenedor = JSON.parse(localStorage.getItem("carrito")) || []
        cargarCarritoHTML()
    })
}
function agregarACarrito(agrega){
    agrega.preventDefault()
    if (agrega.target.classList.contains("agregar-carrito")){
        const curso = agrega.target.parentElement.parentElement
        const datosCurso ={
            imagen: curso.querySelector("img").src,
            titulo: curso.querySelector("h4").textContent,
            precio: curso.querySelector(".precio span").textContent,
            id: curso.querySelector("a").getAttribute("data-id"),
            cantidad: 1
        }
        actualizarCarrito(datosCurso)
    }

}
function actualizarCarrito(datosCurso){
    var agrega = true
    for (let i = 0; i < contenedor.length; i++){
        if (contenedor[i].id === datosCurso.id){
            contenedor[i].cantidad ++
            agrega = false
        }
    }
    if (agrega){contenedor.push(datosCurso)}
    cargarCarritoHTML()

}
function eliminarCurso(curso){
    curso.preventDefault()
    if (curso.target.classList.contains("borrar-curso")){
        const cursoId = curso.target.getAttribute("data-id")
        contenedor = contenedor.filter( c => c.id !== cursoId)
        cargarCarritoHTML()
    }

}
function cargarCarritoHTML(){
    vaciarCarrito()
    contenedor.forEach( curso => {
        const cursoEnCarro = document.createElement("tr")
        cursoEnCarro.innerHTML = `
            <td>  
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(cursoEnCarro)
    })
    sincronizarLocalStorage()
}

function sincronizarLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(contenedor))
}
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
