const divMenu = document.getElementById("menu");


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