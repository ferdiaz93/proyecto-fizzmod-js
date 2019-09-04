const divMenu = document.getElementById("menu");
const divsImg = document.getElementsByClassName("carousel-item");
const contCarousel = document.getElementById("contenedor-carrousel");
const divContenedor = document.getElementById("contenedor");
const divFiltros = document.getElementById("filtros");
const direccionActual = location.href;

let pedidoBody;

pedirMenu(crearMenu)
pedirBody(hacerPedidos);

/**
 * 
 * @param {objeto} datos es un objeto con todo el contenido del body
 * 
 * esta funcion ejecuta las funciones necesarias al abrir la aplicacion 
 */
function hacerPedidos(datos) {
    pedidoBody = datos;
    crearImagenesCarousel(datos.slides);
    crearTodosProductos(datos.products);
    recorrerFiltros(datos.filters);
}

/**
 * 
 * @param {Array} datos es un array de objetos
 * la funcion crea un nodo por cada objeto que haya en el array, usa sos propiedades y agrega todo al DOM
 */
function crearMenu(datos) {
    //se crea un Fragment para guardar dentro todos los elementos <a> que se vayan a crear
    let frag = document.createDocumentFragment();

    datos.map(elemento => {
        let nuevoDiv = document.createElement("div");
        let nuevoLink = document.createElement("a");
        nuevoLink.setAttribute("href", elemento.href);
        nuevoLink.setAttribute("class", "linksMenu");

        nuevoLink.innerText = elemento.title;
        nuevoDiv.appendChild(nuevoLink)

        nuevoDiv.addEventListener("click", ()=>{
            location.href = direccionActual + elemento.href
        })
        frag.appendChild(nuevoDiv)
    });
    //se agrega el fragment al div del DOM
    divMenu.appendChild(frag)
}

/**
 * 
 * @param {Array} datos array de objetos
 * La funcion crea nodos de Img y sus propiedades
 */
function crearImagenesCarousel(datos) {

    datos.map((e, i) => {
        let divEnlace = document.createElement("div");

        if (i === 0) {
            divEnlace.setAttribute("class", "carousel-item active")
        } else {
            divEnlace.setAttribute("class", "carousel-item")
        }
        let aImg = document.createElement("a");
        aImg.setAttribute("href", e.href);
        let nodoImg = document.createElement("img");
        nodoImg.setAttribute("class", "d-block w-100");
        nodoImg.setAttribute("alt", e.imgName);
        nodoImg.setAttribute("src", `./assets/images/${e.imgName}`);

        aImg.appendChild(nodoImg);
        divEnlace.appendChild(aImg);
        contCarousel.appendChild(divEnlace);
    })
}

/**
 * 
 * @param {objeto} producto recibe un objeto con los datos del producto 
 * 
 * funcion que crea el producto y su info en el DOM
 */
function crearProducto(producto) {
    //En caso de que haya descuento se coloca el precio anterior en el h5
    let h5;

    let divCont = document.createElement("div");
    divCont.setAttribute("class", "contenedor-producto");

    // Creacion del div que contiene el span y la imagen del producto
    let divContInfo = document.createElement("div");
    divContInfo.setAttribute("class", "imgProduct");
    //TITULO DEL PRODUCTO
    let h3 = document.createElement("h3");
    h3.innerText = producto.title;
    //IMAGEN DEL PRODUCTO
    let img = document.createElement("img");
    img.setAttribute("src", `./assets/images/${producto.image}`);
    //PRECIO DEL PRODUCTO
    let h4 = document.createElement("h4");
    h4.innerText = `$ ${producto.price.sellingPrice}`;

    // EN CASO DE NO TENER DESCUENTO NO SE CREA EL SPAN
    if (producto.price.listPrice !== producto.price.sellingPrice) {
        //se guarda el porcentaje en una variable
        let porcentajeDif = sacarPorcentaje(producto.price.sellingPrice, producto.price.listPrice)
        //Se crea el span y se le agrega el porcentaje dentro
        let span = document.createElement("span");
        span.innerHTML = `${porcentajeDif}%`;
        // se crea el h5 y se le agrega el precio viejo (tachado)
        h5 = document.createElement("h5");
        h5.innerText = `$ ${producto.price.listPrice}`;

        divContInfo.appendChild(span);

    } else {
        //Si no hay diferencia de precios el h5 estará vacio
        h5 = document.createElement("h5");
        h5.innerText = " ";

    }

    //se appendea todo al div que contiene a cada este producto
    divContInfo.appendChild(img);
    divContInfo.appendChild(h3);
    divContInfo.appendChild(h5);
    divContInfo.appendChild(h4);
    //se appendea todo al div que solo va a mantener este producto
    divCont.appendChild(divContInfo)

    //se le agrega un evento al div para redireccionar segun el producto que clickee
    divCont.addEventListener("click", () => {
        location.href = direccionActual + producto.href
    })
    //se appendea al div del DOM que contiene a todos los productos
    divContenedor.appendChild(divCont);
}


/**
 * 
 * @param {Number} precioNuevo 
 * @param {Number} precioViejo 
 * @return retorna el resultado de la operacion
 * Esta funcion recibe dos numeros y devuelve el porcentaje de la diferencia que tienen esos numeros
 */
function sacarPorcentaje(precioNuevo, precioViejo) {
    let division = precioNuevo / precioViejo;
    let porcentaje = division * 100;
    let resultado = Math.round(porcentaje - 100);

    return resultado;
}

/**
 * 
 * @param {array} datos contiene todos los productos en un array
 * 
 * Esta funcion recorre todos los productos y ejecuta la funcion crearProducto por cada elemento 
 */
function crearTodosProductos(datos) {
    for (let i = 0; i < datos.length; i++) {
        crearProducto(datos[i]);
    }
}


/**
 * 
 * @param {objeto} datos recibe un objeto con las propiedades de los filtros
 * @return retorna un div que contienen los filtros 
 * Esta funcion crea nodos con las propiedades del objeto que recibe
 */

function crearFiltros(datos) {

    let divContenedor = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.innerText = datos.title;
    divContenedor.appendChild(h3);
    let pContenedor = document.createElement("p");
    pContenedor.setAttribute("id", datos.field);
    pContenedor.setAttribute("class", "secciones");

    datos.values.map((e,i)=>{

        let input = document.createElement("input");
        input.setAttribute("class", "inputCheck");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", e);
        
        let label = document.createElement("label");
        label.setAttribute("for", e);
        label.innerText = e;
        
        pContenedor.appendChild(input);
        pContenedor.appendChild(label);
        
    }) 
    
    divContenedor.appendChild(pContenedor);

    return divContenedor;


}
/**
 * 
 * @param {array} datos recibe un array de objetos
 * 
 * funcion que reccore el array de objetos y crea los filtros 
 */
function recorrerFiltros(datos) {
    let fragmentContenedor = document.createDocumentFragment();

    for (let i = 0; i < datos.length; i++) {
        let divContenedor = crearFiltros(datos[i]);
        fragmentContenedor.appendChild(divContenedor);

    }
    divFiltros.appendChild(fragmentContenedor);
}

/**
 * Se le agrega evento al div de los filtros para poder sacar las propiedades
 * necesarias para aplicar los filtros
 */
divFiltros.addEventListener("click", (e) => {

    const todosLosChecks = document.getElementsByClassName("inputCheck");
    let filtros = [];

    for (let i = 0; i < todosLosChecks.length; i++) {
        if (todosLosChecks[i].checked === true) {
            filtros.push(todosLosChecks[i].id);
        }
    }
    if (filtros.length == 0) {
        divContenedor.innerHTML = " ";
        crearTodosProductos(pedidoBody.products);
        return;
    }
    //console.log(filtros);
    aplicarFiltros(filtros, pedidoBody.products);

})

/**
 * 
 * @param {array} filtros array de strings con filtros a aplicar 
 * @param {array} arrayDeObj array de objetos a quienes aplicar los filtros
 * 
 * esta funcion boora el contenido del div contenedor 
 * aplica los filtros y ejecuta otra funcion con un array de objetos
 */
function aplicarFiltros(filtros, arrayDeObj) {
    let arrayAplicados = []
    divContenedor.innerHTML = " ";
    for (let i = 0; i < filtros.length; i++) {
        for (let x = 0; x < arrayDeObj.length; x++) {
            for (let y = 0; y < arrayDeObj[x].attributes.length; y++) {
                if (filtros[i] == arrayDeObj[x].attributes[y].value) {
                    arrayAplicados.push(arrayDeObj[x]);
                }
            }
        }
    }

    crearTodosProductos(arrayAplicados);

}
