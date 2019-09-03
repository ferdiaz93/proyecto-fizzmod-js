const urlMenu = "http://remote.fizzmod.com/menu.json"
const urlBanner = "http://remote.fizzmod.com/body.json"


/**
 * 
 * @param {funcion} callback  
 */
function pedirMenu(callback){
    fetch(urlMenu)
    .then(response => response.json())
    .then(response => callback(response.menu.categories))
}



/**
 * 
 * @param {funcion} callback 
 * pide las rutas de las imagenes y el href
 */
function pedirImagenes(callback){
    fetch(urlBanner)
    .then(response => response.json())
    .then(response => callback(response.slides))
}

/**
 * 
 * @param {funcion} callback
 * funcion que pide todos los productos de la api
 */
function pedirProductos(callback){
    fetch(urlBanner)
    .then(response => response.json())
    .then(response => callback(response.products))
}
