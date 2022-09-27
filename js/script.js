let saved_answer = "si"

function shop() {
    let query = false;
    for (let i = 0; i >= 0; i--) {
        let user_answer = prompt("¿Deseas navegar en el sitio web Tienda Capricho Oficial? \nEscribe si para continuar");
        if (user_answer === saved_answer) {
            alert("Bienvenido/a esperamos que encuentres lo que estas buscando, gracias por confiar en nosotros");
            query = true;
            break;
        } else {
            alert("Nos veremos la proxima")
        }
    }
    return query;
}

if (shop()) {
    let options = prompt("Elegi la opción que quieras realizar. \n1 - Consultar los nuevos ingresos. \n2 - Consultar el stock de niños. \n3 - Consultar el stock de hombres. \n4 - Consultar el stock de mujeres. \n5 - Obtener informacion acerca de nosotros. \n6 - Realizar una consulta a través de nuestro formulario de contacto. \nEscribe ESC para salir.");
    while (options != "ESC" && options != "esc") {
        switch (options) {
            case "1":
                alert("Para ver los nuevos ingresos, debes dirigerte a la página de inicio y allí encontrarás lo ultimo que ingreso.");
                break;

            case "2":
                alert("Para consultar el stock de la indumentaria de niños, dirigete a la sección de ninños.");
                break;

            case "3":
                alert("Para consultar el stock de la indumentaria de hombres, dirigete a la sección de hombres.");
                break;

            case "4":
                alert("Para consultar el stock de la indumentaria de mujeres, dirigete a la sección de mujeres.");            
                break;

            case "5":
                alert("Para obtener informacion acerca de nosotros, dirigete a la sección de Más Info.");
                break;

            case "6":
                alert("Para realizarnos una consulta, dirigete a la sección de contacto.");
                break;

            default:
                alert("Opción invalida, por favor reintente otra vez");
                break;
        }
        options = prompt("Elegi la opción que quieras realizar. \n1 - Consultar los nuevos ingresos. \n2 - Consultar el stock de niños. \n3 - Consultar el stock de hombres. \n4 - Consultar el stock de mujeres. \n5 - Obtener informacion acerca de nosotros. \n6 - Realizar una consulta a través de nuestro formulario de contacto. \nEscribe ESC para salir.");
    }
} else {
    alert("Esperamos que vuelvas pronto");
}

alert("Hasta luego");