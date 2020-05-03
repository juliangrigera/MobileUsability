function intersectan(center_x, center_y, radio, rect){
    var dx = Math.max(rect.left - center_x, 0, center_x - rect.right);
    var dy = Math.max(rect.bottom - center_y, 0, center_y - rect.top);
    var minDist =  Math.sqrt(dx*dx + dy*dy);

    return minDist <= radio;

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
            if(intersectan(center_x, center_y, radio, todos[i].getBoundingClientRect())){
        console.log(todos[i])  }
    

    }}
    )}
    elementosRadio(50);