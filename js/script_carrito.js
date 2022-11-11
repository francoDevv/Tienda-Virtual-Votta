//STOCK
const stockProductosNiños = [
    {id: 1, nombre: "Buzo 1", descripcion: "Un buzo ", precio: 1200, talle: "L", img: '../assets/images/buzoCremaNena.jpg', cantidad: 1},
    {id: 2, nombre: "Buzo 2", descripcion: "Un buzo ", precio: 1100, talle: "L", img: "../assets/images/buzoGrisNene.jpg", cantidad: 1},
    {id: 3, nombre: "Buzo 3", descripcion: "Un buzo ", precio: 1200, talle: "M", img: '../assets/images/buzoHombre.jpg', cantidad: 1},
    {id: 4, nombre: "Buzo 4", descripcion: "Un buzo ", precio: 1400, talle: "M", img: '../assets/images/buzoHombreCeleste.jpg', cantidad: 1},
    {id: 5, nombre: "Buzo 5", descripcion: "Un buzo ", precio: 1200, talle: "S", img: '../assets/images/buzoMujer.jpg', cantidad: 1},
    {id: 6, nombre: "Buzo 6", descripcion: "Un buzo ", precio: 1500, talle: "S", img: '../assets/images/buzoRosaMujer.jpg', cantidad: 1},
    {id: 7, nombre: "Remera 1", descripcion: "Una remera ", precio: 500, talle: "L", img: '../assets/images/camisetaRayadaNene.jpg', cantidad: 1},
    {id: 8, nombre: "Remera 2", descripcion: "Una remera ", precio: 500, talle: "L", img: '../assets/images/remeraAmarillaHombre.jpg', cantidad: 1},
    {id: 9, nombre: "Remera 3", descripcion: "Una remera ", precio: 500, talle: "M", img: '../assets/images/remeraBlancaHombre.jpg', cantidad: 1},
    {id: 10, nombre: "Remera 4", descripcion: "Una remera ", precio: 700, talle: "M", img: '../assets/images/remeraMostazaHombre.jpg', cantidad: 1},
    {id: 11, nombre: "Remera 5",descripcion: "Una remera ", precio: 700, talle: "S", img: '../assets/images/remeraNegraMujer.jpg', cantidad: 1},
    {id: 12, nombre: "Remera 6", descripcion: "Una camisa ", precio: 700, talle: "S", img: '../assets/images/camisaCelesteHombre.jpg', cantidad: 1},
];

//VARIABLES
let carrito = [];

const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor = document.querySelector("#carritoContenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")
const seguirCompra = document.querySelector("#seguirCompra")
const activarFuncion = document.querySelector("#activarFuncion")
const totalCompra = document.querySelector("#totalCompra")
const formulario = document.querySelector("#procesar-pago")

//EVENTOS
if (activarFuncion) {
    activarFuncion.addEventListener("click", seguirPedido)
}

if(formulario){
    formulario.addEventListener("submit", enviarPedido)
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito()
    if(activarFuncion){
        document.querySelector("#activarFuncion").click(seguirPedido);
    }
});

//MOSTRAR PRODUCTOS EN EL DOM
stockProductosNiños.forEach((producto) => {
    const {id, nombre, descripcion, precio, talle, img}=producto

    if(contenedorProductos){
        contenedorProductos.innerHTML += `
    <div class="card text-center articulo" style="width: 18rem;">
        <img src="${img}" class="card-img-top mt-2" alt="imagen de jean" loading="lazy">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <h5 class="card-title">$${precio}</h5>
            <p class="card-text card_fuente">${descripcion}</p>
            <p class="card-text card_fuente">Talles : ${talle}</p>
            <button onclick="agregarProducto(${id})" class="btn colorButton">Agregar al carrito</button>
        </div>
    </div>
    `
    }
    
});

// EVALUAMOS SI HAY PRODUCTOS
if (seguirCompra) {
    seguirCompra.addEventListener("click", () => {
        if (carrito.length === 0){
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Agrega algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
        })
    }   else{
        location.href = "../pages/compra.html"
    }
    })
}

//VACIAR CARRITO
if(vaciarCarrito){
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = []
        mostrarCarrito()
    })
}

//AGREGAR PRODUCTO
function agregarProducto(id){
    const existe = carrito.some(prod => prod.id === id)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductosNiños.find((producto) => producto.id === id)
        carrito.push(item)
    }

    mostrarCarrito()
};

//MOSTRAR EL CARRITO
const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body")

    if (modalBody){
        modalBody.innerHTML = ""
    carrito.forEach((producto) => {
        const {id, nombre, descripcion, precio, talle, img, cantidad} = producto
        modalBody.innerHTML += 
        `
        <div class = "modal-contenedor">
            <div>
                <img class = "img-fluid img-carrito" src = "${img}"/>
            </div>
            <div>
                <h5>${nombre}</h5>
                <h5>${precio}</h5>
                <h5>${descripcion}</h5>
                <p class = "fuente-parrafo">Talle: ${talle}</p>
                <p class = "fuente-parrafo">Cantidad: ${cantidad}</p>
                <button onclick="eliminarProducto(${id})" class = "btn btn-danger">Eliminar producto</button>
            </div>
        </div>
        `
    })
    }
    
    if(carrito.length === 0){
        modalBody.innerHTML = 
        `
        <h5>Aun no agregaste productos a tu carrito</h5>
        `
    }

    carritoContenedor.textContent = carrito.length

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
    }

    guardarStorage()
}

//ELIMINAR PRODUCTO
function eliminarProducto(id){
    const prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    mostrarCarrito()
}


//GUARDAR EL STORAGE
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//CONTINUAMOS CON LA COMPRA
function seguirPedido(){
    carrito.forEach((producto) => {
        const listaCompra = document.querySelector("#lista-compra tbody")
        const {id, nombre, precio, talle, img, cantidad} = producto
        const row = document.createElement("tr")
        row.innerHTML += `
            <td>
            <img class = "img-fluid img-carrito" src = "${img}" />
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${talle}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
        `

        listaCompra.appendChild(row)
    })
    totalCompra.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
}

//EVALUAMOS SI SE COMPLETAN LOS DATOS PARA LA CONFIRMACION DE LA COMPRA
function enviarPedido(e) {
    e.preventDefault()
    const cliente = document.querySelector("#cliente").value
    const correo = document.querySelector("#correo").value

    if (cliente === "" || correo === "") {
        Swal.fire({
            title: "Debes completar todos las campos",
            text: "Por favor rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    } else {
        Swal.fire({
            title: "GRACIAS POR TU COMPRA",
            text: "Esperamos que te guste",
            icon: "success",
            confirmButtonText: "Aceptar"
        })
        formulario.reset()
        location.href = "../index.html"
    }
}

//BUSCADOR
document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        if (e.key === "Escape")e.target.value = ""
        document.querySelectorAll(".articulo").forEach(ropa => {
            ropa.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?ropa.classList.remove("filtro")
            :ropa.classList.add("filtro")
        })
    }
})