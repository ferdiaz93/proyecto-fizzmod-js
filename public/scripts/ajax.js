const urlMenu = "http://remote.fizzmod.com/menu.json"
const urlBody = "http://remote.fizzmod.com/body.json"


/**
 * 
 * @param {funcion} callback  
 */
function pedirMenu(callback){
    fetch(urlMenu)
    .then(response => response.json())
    .then(response => callback(response.menu.categories))
    .catch((error)=>{
        console.log(error);
    })
}

/**
 * 
 * @param {funcion} callback 
 * pide las rutas de las imagenes y el href
 */
function pedirBody(callback){
    fetch(urlBody)
    .then(response => response.json())
    .then(response => callback(response))
    .catch((error)=>{
        console.log(error);
    })
}