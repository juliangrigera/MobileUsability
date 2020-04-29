function intersectan(center_x, center_y, radio, elemRect){
 

}

function elementosRadio(radio){
    window.addEventListener("click", (e) => {
        let todos = document.getElementsByTagName("*");
        var center_x = e.clientX;
        var center_y = e.clientY;
        console.log("Las coordenadas del click son x: " +center_x+" y:"+center_y)  
        console.log("El radio seleccionado es de: "+radio+"px");
        console.log("Los elementos son: ");
        for (var i=0, max=todos.length; i < max; i++) {
            /*
            
            if(intersectan(cir, todos[i].getBoundingClientRect())){
        console.log(todos[i].getBoundingClientRect())    }
    
*/
    }}
    )}
    elementosRadio(4);