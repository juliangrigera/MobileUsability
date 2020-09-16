localStorage.setItem("prueba", "prueba");
closeButtons = document.getElementsByClassName("sgpb-popup-close-button-2");
console.log(closeButtons);
for(i=0; i < closeButtons.length ;i++){
    closeButtons[i].addEventListener('click', prueba2);
}

alert("Bienvenid@! Este sitio tiene varios errores de diseño y esta prueba permitirá detectarlos. A continuación le daremos unas instrucciones con simples pasos a seguir. Cuando esté listo@ presione OK. ");
alert("PRUEBA 1: En la parte inferior de la pantalla aparecerán 3 carteles. Intente cerrarlos presionando \"X\" en cada uno. Si por error es redirigido a otro sitio, vuelva hacia atrás y prosiga con la prueba. Cuando esté list@ presione OK. ")

function prueba2() {
    alert("PRUEBA 2: ");
}

function prueba3() {
    alert("PRUEBA 3: ");
}