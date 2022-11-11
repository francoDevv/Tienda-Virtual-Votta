// VARIABLES
const contenedorProductos=document.querySelector("#contenedor-productos")

//MOSTRAR EL STOCK EN EL DOM
function mostrarStock(){
    fetch('./js/stock.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            productos.forEach(producto => {
                const {id, nombre, descripcion, precio, talle, img}=producto
                contenedorProductos.innerHTML += `
                    <div class="card text-center articulo" style="width: 18rem;">
                        <img src="${img}" class="card-img-top mt-2" alt="imagen de jean" loading="lazy">
                        <div class="card-body">
                            <h5 class="card-title">${nombre}</h5>
                            <h5 class="card-title">$${precio}</h5>
                            <p class="card-text card_fuente">${descripcion}</p>
                            <p class="card-text card_fuente">Talles : ${talle}</p>
                            <button onclick="agregarProducto(${id})" class="btn colorButton d-none">Agregar al carrito</button>
                        </div>
                    </div>
                    `;
            });
        })
}

mostrarStock();

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