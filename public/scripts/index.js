const divMenu = document.getElementById("menu");
const divsImg = document.getElementsByClassName("carousel-item");
const contCarousel = document.getElementById("contenedor-carrousel");
const divContenedor = document.getElementById("contenedor");
const direccionActual = location.href;

pedirMenu(crearMenu)
pedirImagenes(crearImagenesCarousel);
pedirProductos(crearTodosProductos)

/**
 * 
 * @param {Array} datos es un array de objetos
 * la funcion crea un nodo por cada objeto que haya en el array, usa sos propiedades y agrega todo al DOM
 */
function crearMenu(datos) {
    //se crea un Fragment para guardar dentro todos los elementos <a> que se vayan a crear
    let frag = document.createDocumentFragment();

    datos.map(e => {
        let nuevoDiv = document.createElement("div");
        let nuevoLink = document.createElement("a");
        nuevoLink.setAttribute("href", e.href);
        nuevoLink.setAttribute("class", "linksMenu");

        nuevoLink.innerText = e.title;
        nuevoDiv.appendChild(nuevoLink)
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

    for (let i = 0; i < datos.length; i++) {
        let divEnlace = document.createElement("div");

        if (i === 0) {
            divEnlace.setAttribute("class", "carousel-item active")
        } else {
            divEnlace.setAttribute("class", "carousel-item")
        }
        let aImg = document.createElement("a");
        aImg.setAttribute("href", datos[i].href);
        let nodoImg = document.createElement("img");
        nodoImg.setAttribute("class", "d-block w-100");
        nodoImg.setAttribute("alt", datos[i].imgName);
        nodoImg.setAttribute("src", `./assets/images/${datos[i].imgName}`);

        aImg.appendChild(nodoImg);
        divEnlace.appendChild(aImg);
        contCarousel.appendChild(divEnlace);
    }
}
/**
 * 
 * @param {objeto} datos recibe un objeto con los datos del producto 
 * 
 * funcion que crea el producto y su info en el DOM
 */
function crearProducto(producto) {
    let h5;

    let divCont = document.createElement("div");
    divCont.setAttribute("class", "contenedor-producto");

    // creacion del div que contiene el span y la imagen del producto
    let divContInfo = document.createElement("div");
    divContInfo.setAttribute("class", "imgProduct");
    //TITULO DEL PRODUCTO
    let h3 = document.createElement("h3");
    h3.innerText = producto.title;
    //IMAGEN DEL PRODUCTO
    let img = document.createElement("img");
    img.setAttribute("src", `./assets/images/${producto.image}`);

    let h4 = document.createElement("h4");
    h4.innerText = `$ ${producto.price.sellingPrice}`;

    if (producto.price.listPrice !== producto.price.sellingPrice) {
        let porcentajeDif = sacarPorcentaje(producto.price.sellingPrice, producto.price.listPrice)
        let span = document.createElement("span");
        span.innerHTML = `${porcentajeDif}%`;

        h5 = document.createElement("h5");
        h5.innerText = `$ ${producto.price.listPrice}`;

        divContInfo.appendChild(span);

    } else {
        h5 = document.createElement("h5");
        h5.innerText = " ";

    }

    divContInfo.appendChild(img);
    divContInfo.appendChild(h3);
    divContInfo.appendChild(h5);
    divContInfo.appendChild(h4);

    divCont.appendChild(divContInfo)

    divCont.addEventListener("click", ()=>{
        location.href = direccionActual + producto.href
    })
    divContenedor.appendChild(divCont);
}



function sacarPorcentaje(precioNuevo, precioViejo) {
    let division = precioNuevo / precioViejo;
    let porcentaje = division * 100;
    let resultado = Math.round(porcentaje - 100);

    return resultado;
}


function crearTodosProductos(datos){
    for(let i = 0; i < datos.length; i++){
        crearProducto(datos[i]);
    }
}

