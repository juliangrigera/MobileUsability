//imports--
import AreaClick from './areaClick.js';
import AreaClickTest from './areaClickTest.js';

//***
var areaClick = null;


window.addEventListener('load', initialize, false);

function initialize() {
	document.addEventListener("click", createPointCircle);
	
//	let areaClickTest =new AreaClickTest();
//	areaClickTest.run();
	
}

//>>>>>>> list events functions <<<<<<<<<<<<<<<<
function createPointCircle(event) {
	//let ratio = Number(window.prompt("ingrese radio", 0));

	// AreaClick.newCircunferencia( pointX, pointY, ratio)
	areaClick = AreaClick.newCircumference(event.clientX, event.clientY, 15);
	console.log(areaClick);
		
	
	//buscamos los elementos del dom en el area
	let domElementsInArea = findDomsInArea( document.body.children );
	console.log( domElementsInArea );

}


//>>>>>>> functions <<<<<<<<<<<<<<<<

function findDomsInArea( domCollection ){
	
	let intersectElements =new Array();

	for ( let i=0;i < domCollection.length ;i++){
		
		//si el elemento dom esta en el area del Click lo agrega
		let inAreaClick = isIntersectionAreaClick( domCollection[i].getBoundingClientRect() );
		if( inAreaClick ){
			//agrega el elemento html no su posicion
		  	intersectElements.push( domCollection[i] );
		}
		//**RECURSION llama nuevamente a la funcion con la colleccion de hijos
		let elementsDomInArea = findDomsInArea( domCollection[i].children );
		//conbina los elementos actuales con los de la recursion
		Array.prototype.push.apply( intersectElements, elementsDomInArea );
	}
	
	return intersectElements;
}

//elementos html que esten dentro del area
function isIntersectionAreaClick( domRect ){
	//cordenadas del obj html se optiene con la fucnion getBoundingClientRect() 
	//"DOMRect" collecion Map(clave:valor) con  x,y width, height  
	return areaClick.isIntersectionRectangle( domRect.x, domRect.y, domRect.height, domRect.width );
}


function clicksecundary(event) {
	console.log('punto x:' + event.clientX + '  punto y:' + event.clientY);

	console.log(this.areaClick.isCircumferencePoint(event.clientX, event.clientY));

	if (this.areaClick.isCircumferencePoint(event.clientX, event.clientY)) {
		alert("punto dentro del radio del primer click");
	} else {
		alert("punto fuera del radio del primer click");
	}
}
