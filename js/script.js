let saved_answer = "si"
let user_answer = prompt("¿Deseas navegar en el sitio web Tienda Capricho Oficial? \nEscribe si para continuar");

if (user_answer === saved_answer) {
    alert("Bienvenido/a esperamos que encuentres lo que estas buscando, gracias por confiar en nosotros");
} else {
        alert("Nos veremos la proxima")
}

class Product {
    constructor(name, gender, color, size, price, payment_methods, id){
        this.name = name;
        this.gender = gender;
        this.color = color;
        this.size = size;
        this.price = parseInt(price);
        this.payment_methods = payment_methods;
        this.id = id;
    }
    giveId(array){
        this.id = array.length;
    }
}

const products = [
    new Product("Jean", "Men", "Blue", "S - M - L - XL - XXl", 1000, "All payments methods", 1),
    new Product("Poulover", "Women", "Blue and grey / Brown", "S - M - L - XL - XXl", 100, "All payments methods", 2),
    new Product("Hoodie", "Men", "Beige / LigthBlue", "S - M - L - XL - XXl", 1300, "All payments methods", 3),
    new Product("Denim Jacket", "Women", "LigthBlue", "S - M - L - XL - XXl", 900, "All payments methods", 4),
    new Product("Sweater", "Boys", "Moss Green", "4, 6, 8, 10, 12, 14, 16", 1970, "All payments methods", 5),
    new Product("Pijama", "Unisex", "Cocodrile / Walrus", "4, 6, 8, 10, 12, 14, 16", 300, "All payments methods", 6),
]

alert("Estos son los productos que tenemos en stock:\n" + JSON.stringify(products, null ,4));

let next = true;

while (next) {
    let add = prompt("Te gustaria que agregaramos un producto? Si es así, deja aquí lo siguientes datos (separados con un guion -): name - gender - color - size - price - payments methods. Ingresa la palabra NO para finalizar");
    if (add.toUpperCase() == "NO") {
        next = false;
        break;
    }

    let added_products = add.split("-");
    console.log(added_products);
    const user_products = new Product(added_products[0], added_products[1], added_products[2], added_products[3], added_products[4], added_products[5]);
    products.push(user_products);
    user_products.giveId(products);
    console.log(products);
}

let organize = prompt("Elegi la forma de ordenar los productos \n1) Nombre (A - Z) \n2) Nombre (Z - A) \n3) Precio ascendente \n4) Precio Descendente");

function ordenar(organize, array) {
    let ordenado = array.slice(0);

    switch (organize) {
        case "1":
            let nombre_ascendente = ordenado.sort((a,b)=>a.name.localeCompare(b.name));
            return nombre_ascendente;
        case "2":
            let nombre_descendente = ordenado.sort((a,b)=>b.name.localeCompare(a.name));
            return nombre_descendente;
        case "3":
            return ordenado.sort((a,b)=>a.price- b.price);
        case "4":
            return ordenado.sort((a,b)=> b.price - a.price);
        default:
            alert("No es un criterio valido para ordenar")
            break;
    }
}

function string_result(array){
    let info = "";

    array.forEach(elemento=>{
        info += "Nombre: " + elemento.name + "\nGenero: " + elemento.gender + "\nColor: " + elemento.color + "\nSize: " + elemento.size + "\nPrecio: " + elemento.price + "\nMetodos de Pago: " + elemento.payment_methods + "\n\n"
    })

    return info;
}

alert(string_result(ordenar(organize, products)));

alert("Hasta luego");