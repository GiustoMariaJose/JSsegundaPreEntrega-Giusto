//? Segunda Pre entrega: Este sistema es de ayuda para una empresa constructora que necesita buscar terrenos para comprar, dentro de un rango de precios estipulado. Luego, le servirán para la construcción y venta de casas.

//Función que pide ingresar terrenos con nombre de barrio y precio.
function ingresarTerrenos() {
    let terrenos = [];
    let continuar = true;

    while (continuar===true){
        const barrioTerreno = prompt("Ingresar descripción: Barrio y m2 del terreno. Ej: Las Cañitas 300m2.");
        const precio = parseFloat(prompt("Ingresar el precio del terreno."));

        if (isNaN(precio) || precio <= 0){
            alert("Ingresar un precio numérico mayor a 0");
        }else{
            terrenos.push({barrioTerreno: barrioTerreno, precio: precio});
        }

        const respuesta = prompt("Querés ingresar otro terreno? Si/No").toLowerCase();
        if (respuesta === "si") {
            continuar = true;
        } else {
            continuar = false;
        }
    }

    return terrenos;
}


//Función para calcular el promedio de precios de terrenos.

function calcularPromedio(terrenos) {
    const suma = terrenos.reduce((accum, terreno) => accum + terreno.precio, 0);
    const promedio = suma / terrenos.length;
    return promedio;
}

//Función para mostrar el/los terrenos más caro/s. Es decir cuyo precio es el mayor de la lista de terrenos agregados.

function terrenosMasCaros(terrenos){
    let masCaro = terrenos[0].precio;

    terrenos.forEach(terreno => {
        if (terreno.precio > masCaro) {
            masCaro = terreno.precio;
        }
        
    });
    let mayorPrecio = terrenos.filter((terreno) => terreno.precio === masCaro);
    return mayorPrecio;
}

//Función para mostrar el/los terrenos más barato/s. Es decir cuyo precio es el menor de la lista de terrenos agregados.

function terrenosMasBaratos(terrenos){
    let masBarato = terrenos[0].precio;

    terrenos.forEach(terreno => {
        if (terreno.precio < masBarato) {
            masBarato = terreno.precio;
        }
        
    });
    let menorPrecio = terrenos.filter((terreno) => terreno.precio === masBarato);
    return menorPrecio;
}

//Función para definir presupuesto máximo
function definirPresupuestoMax(){
    let precioMax = 0;
    let seguimos = true;

    while (seguimos === true) {
        const max = parseFloat(prompt("Ingresar precio del presupuesto máximo"));
        if (isNaN(max) || max <= 0) {
            alert("Ingresar un precio numérico mayor a 0");
        } else {
            precioMax = max;
            seguimos = false;
        }
    }

    return precioMax;
}
//Función para definir presupuesto mínimo
function definirPresupuestoMin(){
    let precioMin = 0;
    let seguir = true;

    while (seguir === true) {
        const min = parseFloat(prompt("Ingresar precio del presupuesto mínimo"));
        if (isNaN(min) || min < 0) {
            alert("Ingresar un precio numérico. Puede ser 0.");
        } else {
            precioMin = min;
            seguir = false;
        }
    }

    return precioMin;
}

//Función para mostrar los terrenos seleccionados y los descartados, según el presupuesto que ingrese el usuario. 

function mostrarSeleccionadosYdescartados(terrenos) {
    const precioMaximo = definirPresupuestoMax();
    const precioMinimo = definirPresupuestoMin();
    let seleccionados = [];
    let descartados = [];
    

    terrenos.forEach((terreno) => {
        if (terreno.precio >= precioMinimo && terreno.precio <= precioMaximo) {
            seleccionados.push(terreno);
        } else {
            descartados.push(terreno);
        }
    })
    console.log("%c*** Terrenos seleccionados en el rango ingresado: " + precioMaximo + " y " + precioMinimo + " dólares ***", "color: blue");
    console.log("%cSeleccionados", "color: blue");
    seleccionados.forEach((terreno) => {
        console.log(terreno.barrioTerreno + " cuesta: " + terreno.precio + " dólares");
        //console.table(seleccionados);
    })
    console.log("%cDescartados", "color: blue");
    descartados.forEach((terreno) => {
        console.log(terreno.barrioTerreno + " cuesta: " + terreno.precio + " dólares");
        //console.table(descartados);
    })
}

//Función principal

function sistemaDeSeleccion() {
       
    const lotes = ingresarTerrenos();
    if (lotes.length === 0) {
        console.log("No hay terrenos cargados");
        return;
    }

    const promedioPrecios = calcularPromedio(lotes);
    const masCaro = terrenosMasCaros(lotes);
    const masBarato = terrenosMasBaratos(lotes);

    console.log("%c*** Promedio de precios de terrenos ***", "color: blue");
    console.log(promedioPrecios.toFixed(2) + " dólares");

    console.log("%c*** Terreno de mayor precio ***", "color: blue");
    masCaro.forEach((terreno) => console.log(terreno.barrioTerreno + " cuesta: " + terreno.precio + " dólares."));

    console.log("%c*** Terreno de menor precio ***", "color: blue");
    masBarato.forEach((terreno) => console.log(terreno.barrioTerreno + " cuesta: " + terreno.precio + " dólares."));
    
    mostrarSeleccionadosYdescartados(lotes);

    
}

sistemaDeSeleccion();
