//imports--
import AreaClick from './areaClick.js';

export default class AreaClickTest{
    //lo uso solo para declarar variables porque queda mas claro
    constructor(){
		this.areaClick = AreaClick.newCircumference(20,30,20);
    }
	
	run(){
		console.log("**** AreaClickTest ****");
		console.log(this.areaClick.printCircumference() );
		
		//test superposicion linea horizontal
		this.isIntersectionLineX( );
		//test superposicion linea horizontal
		this.isIntersectionLineY( );
		//test superposicion rectangulo puntos de esquinas
		this.isIntersectionRectangleCornersPoints();
		//test superposicion rectangolo base alto ancho
		this.isIntersectionRectangle();
		
		
		console.log("**finished");
	}
	
//****ASSERT(boolean,"mje de error") si boolean es falso lanza error (No es resultado esperado)

	
	isCircumferencePoint(){
		
	}
	
//	isIntersectionLineX(initialPointX, finalPointX, pointY)
	isIntersectionLineX(){
		//linea no pasa
		console.assert( !this.areaClick.isIntersectionLineX(20, 30, 9),"la linea horizontal No pasa por el area" );
		
		//line pasa por el circulo
		console.assert( this.areaClick.isIntersectionLineX(20, 30, 10),"la linea horizontal pasa por el area" );
	
	}
	
//	isIntersectionLineY(initialPointY, finalPointY, pointX)
	isIntersectionLineY(){
		//linea no pasa
		console.assert( !this.areaClick.isIntersectionLineY(10, 30, 41),"la linea vertical No pasa por el area" );
		
		//line pasa por el circulo
		console.assert( this.areaClick.isIntersectionLineY(10, 30, 0),"la linea vertical pasa por el area" );
	}
	
	//isIntersectionRectangleCornersPoints( aX,aY, bX,bY, cX,cY, dX,dY )
	isIntersectionRectangleCornersPoints(){
//		rectangulo superpuesto 
//		b(0,20)  c(20,20)
//		a(0,0)	 d(20,0)
		console.assert(this.areaClick.isIntersectionRectangleCornersPoints(0,0, 0,20, 20,20, 20,0 )
					   ,"rectangulo superpuesto" );
		
//		rectangulo No superpuesto
//		b(40,20)  c(60,20) 
//		a(40,0)	 d(60,0) 
		console.assert(!this.areaClick.isIntersectionRectangleCornersPoints(40,0, 40,20, 60,20, 60,0 )
					   ,"rectangulo No superpuesto" );
		
	}
	
	//isIntersectionRectangle( originX,originY, high, width )
	isIntersectionRectangle(){
		
		console.log("1st Rectangle  test");
		console.log( this.areaClick.printRectangle(0,0, 20, 30) );
		
		console.assert(this.areaClick.isIntersectionRectangle( 0,0, 20, 30 )
					   ,"rectangulo superpuesto");
		
		console.log("2nd Rectangle test");
		console.log( this.areaClick.printRectangle(40,0, 20, 30) );
		
		console.assert(!this.areaClick.isIntersectionRectangle( 40,0, 20, 30 )
					   ,"rectangulo No superpuesto");
		
	}
	
	
}