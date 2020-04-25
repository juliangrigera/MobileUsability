function elementosRadio(radio){
    window.addEventListener("click", (e) => {
        let todos = document.getElementsByTagName("*");
      
    for (var i=0, max=todos.length; i < max; i++) {
        //ESTE FOR RECORRE TODOS LOS ELEMENTOS DE LA PAGINA
    }
    
    //ESTA PARTE TOMA LAS COORDENADAS DEL CLICK Y LAS IMPRIME EN PANTALLA
    
    var x = e.clientX;
      var y = e.clientY;
      var coords = "X coords: " + x + ", Y coords: " + y;
    
    
    console.log(coords);  
    }
    )}
    elementosRadio(4);