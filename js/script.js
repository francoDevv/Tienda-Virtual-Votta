const stockProductos = [
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

let carrito = [];

const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor = document.querySelector("#carritoContenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")
const seguirCompra = document.querySelector("#seguirCompra")
const activarFuncion = document.querySelector("#activarFuncion")
const totalCompra = document.querySelector("#totalCompra")
const formulario = document.querySelector("#procesar-pago")

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

stockProductos.forEach((producto) => {
    const {id, nombre, descripcion, precio, talle, img}=producto

    if(contenedorProductos){
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
    `
    }
    
});


if (seguirCompra) {
    seguirCompra.addEventListener("click", () => {
        if (carrito.length === 0){
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
        })
    }   else{
        location.href = "../pages/compra.html"
    }
    })
}

if(vaciarCarrito){
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = []
        mostrarCarrito()
    })
}


function agregarProducto(id){
    const existe = carrito.some(prod => prod.id === id)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((producto) => producto.id === id)
        carrito.push(item)
    }

    mostrarCarrito()
};

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
                <p>${talle}</p>
                <p>${cantidad}</p>
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

function eliminarProducto(id){
    const prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    mostrarCarrito()
}

function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

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
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
        `

        listaCompra.appendChild(row)
    })
    totalCompra.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
}

function enviarPedido(e) {
    e.preventDefault()
    const cliente = document.querySelector("#cliente").value
    const correo = document.querySelector("#correo").value

    if (correo === "" || cliente === "") {
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
    }
}









// let saved_answer = "si"
// let user_answer = prompt("¿Deseas navegar en el sitio web Tienda Capricho Oficial? \nEscribe si para continuar");

// if (user_answer === saved_answer) {
//     alert("Bienvenido/a esperamos que encuentres lo que estas buscando, gracias por confiar en nosotros");
// } else {
//         alert("Nos veremos la proxima")
// }

// class Product {
//     constructor(name, gender, color, size, price, payment_methods, id){
//         this.name = name;
//         this.gender = gender;
//         this.color = color;
//         this.size = size;
//         this.price = parseInt(price);
//         this.payment_methods = payment_methods;
//         this.id = id;
//     }
//     giveId(array){
//         this.id = array.length;
//     }
// }

// const products = [
//     new Product("Jean", "Men", "Blue", "S - M - L - XL - XXl", 1000, "All payments methods", 1),
//     new Product("Poulover", "Women", "Blue and grey / Brown", "S - M - L - XL - XXl", 100, "All payments methods", 2),
//     new Product("Hoodie", "Men", "Beige / LigthBlue", "S - M - L - XL - XXl", 1300, "All payments methods", 3),
//     new Product("Denim Jacket", "Women", "LigthBlue", "S - M - L - XL - XXl", 900, "All payments methods", 4),
//     new Product("Sweater", "Boys", "Moss Green", "4, 6, 8, 10, 12, 14, 16", 1970, "All payments methods", 5),
//     new Product("Pijama", "Unisex", "Cocodrile / Walrus", "4, 6, 8, 10, 12, 14, 16", 300, "All payments methods", 6),
// ]

// alert("Estos son los productos que tenemos en stock:\n" + JSON.stringify(products, null ,4));

// let next = true;

// while (next) {
//     let add = prompt("Te gustaria que agregaramos un producto? Si es así, deja aquí lo siguientes datos (separados con un guion -): name - gender - color - size - price - payments methods. Ingresa la palabra NO para finalizar");
//     if (add.toUpperCase() == "NO") {
//         next = false;
//         break;
//     }

//     let added_products = add.split("-");
//     console.log(added_products);
//     const user_products = new Product(added_products[0], added_products[1], added_products[2], added_products[3], added_products[4], added_products[5]);
//     products.push(user_products);
//     user_products.giveId(products);
//     console.log(products);
// }

// let organize = prompt("Elegi la forma de ordenar los productos \n1) Nombre (A - Z) \n2) Nombre (Z - A) \n3) Precio ascendente \n4) Precio Descendente");

// function ordenar(organize, array) {
//     let ordenado = array.slice(0);

//     switch (organize) {
//         case "1":
//             let nombre_ascendente = ordenado.sort((a,b)=>a.name.localeCompare(b.name));
//             return nombre_ascendente;
//         case "2":
//             let nombre_descendente = ordenado.sort((a,b)=>b.name.localeCompare(a.name));
//             return nombre_descendente;
//         case "3":
//             return ordenado.sort((a,b)=>a.price- b.price);
//         case "4":
//             return ordenado.sort((a,b)=> b.price - a.price);
//         default:
//             alert("No es un criterio valido para ordenar")
//             break;
//     }
// }

// function string_result(array){
//     let info = "";

//     array.forEach(elemento=>{
//         info += "Nombre: " + elemento.name + "\nGenero: " + elemento.gender + "\nColor: " + elemento.color + "\nSize: " + elemento.size + "\nPrecio: " + elemento.price + "\nMetodos de Pago: " + elemento.payment_methods + "\n\n"
//     })

//     return info;
// }

// alert(string_result(ordenar(organize, products)));
