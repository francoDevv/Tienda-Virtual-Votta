let carrito = [];

const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor = document.querySelector("#carritoContenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")
const seguirCompra = document.querySelector("#seguirCompra")
const activarFuncion = document.querySelector("#activarFuncion")
const totalCompra = document.querySelector("#totalCompra")
const formulario = document.querySelector("#procesar-pago")

function mostrarStock(){
    fetch('../js/stock.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            productos.forEach(producto => {
                const {id, nombre, descripcion, precio, talle, img}=producto
                contenedorProductos.innerHTML += `
                    <div class="card text-center" style="width: 18rem;">
                        <img src="${img}" class="card-img-top mt-2" alt="imagen de jean" loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${nombre}</h5>
                            <h5 class="card-title">$${precio}</h5>
                            <p class="card-text card_fuente">${descripcion}</p>
                            <p class="card-text card_fuente">Talles : ${talle}</p>
                            <button onclick="agregarProducto(${id})" class="btn colorButton">Agregar al carrito</button>
                        </div>
                    </div>
                    `;
            });
        })
}

mostrarStock();