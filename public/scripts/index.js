const divMenu = document.getElementById("menu");
const divsImg = document.getElementsByClassName("carousel-item");
const contCarousel = document.getElementById("contenedor-carrousel")

pedirMenu(crearMenu)
pedirImagenes(crearImagenesCarousel);
pedirProductos(crearProductos)

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
function crearImagenesCarousel(datos){

    for(let i = 0; i < datos.length ; i++){
        let divEnlace = document.createElement("div");

        if(i === 0){
            divEnlace.setAttribute("class", "carousel-item active")
        }else{
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

function crearProductos(datos){
    console.log(datos)
}