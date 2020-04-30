//imports--
import AreaClick from './areaClick.js';
 
//***
var areaClick=null;


window.addEventListener('load', initialize, false);

function initialize(){
	document.addEventListener("click", createPointCircle);
	
}

//>>>>>>> list events functions <<<<<<<<<<<<<<<<
function createPointCircle(event) {	
	let ratio = Number( window.prompt("ingrese radio", 0) );
	
	// AreaClick.newCircunferencia( pointX, pointY, ratio)
	this.areaClick = AreaClick.newCircunferencia( event.clientX, event.clientY,ratio);
	
	//change event click document
	document.removeEventListener("click", createPointCircle);
	document.addEventListener("click", clicksecundary);
	
	console.log(this.areaClick);
}

function clicksecundary(event){
	console.log('punto x:'+event.clientX+'  punto y:'+event.clientY);
	
	console.log(this.areaClick.isCircumferencePoint( event.clientX, event.clientY ));
	
	if( this.areaClick.isCircumferencePoint( event.clientX, event.clientY ) ){
		alert("punto dentro del radio del primer click");	
	}else{
		alert("punto fuera del radio del primer click");
	}
	
}


