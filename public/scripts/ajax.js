/**
 * funcion que pide los datos para armar el menu
 */
function pedirMenu(){
    fetch("http://remote.fizzmod.com/menu.json")
    .then(response => response.json())
    .then(response => crearMenu(response.menu.categories))
}


pedirMenu()