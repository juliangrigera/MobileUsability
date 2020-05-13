

    window.addEventListener("click", event => {

        //crea div con position absuluta en los eje x e y
        let dot = document.createElement("div");
        //dot.className = "dot";
        dot.classList.add("dot");
        dot.setAttribute("id","dot");

        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        //y se lo asigna a document body
        document.body.appendChild(dot);
      
      });