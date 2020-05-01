export default class AreaClick{
    //lo uso solo para declarar variables porque queda mas claro
    constructor(){
        this.ejex=null;
        this.ejey=null;
		this.ratio=null;
    }
    
//>>>>>>> CONSTRUCTORS <<<<<<<<<<
    static newPoint(pointx, pointy){
		let point = new AreaClick();
        point.ejex = pointx;
        point.ejey = pointy;
		return point;
    }
	
	static newCircumference(pointx,pointy,ratio){
		let point = new AreaClick();
		point.ejex = pointx;
		point.ejey = pointy;
		point.ratio = ratio;
		return point;
	}
    
	setRatio(ratio){
		this.ratio =ratio;
	}
	
	
//****** FUNCTIONS ****
    printPoints(){
		return `pointX = ${this.ejex} pointY =  ${this.ejey}`;
    }
	
	printCircumference(){
		return `Center =(${this.ejex},${this.ejey}) ratio = ${this.ratio}`;
	}
	
	printRectanglePoints( aX,aY, bX,bY, cX,cY, dX,dY ){
		return `point B(${bX},${bY}) \t \t point C(${cX},${cY}) \npoint A(${aX},${aY}) \t \t point D(${dX},${dY}) `;
	}
	
	printRectangle(originX,originY, high, width){
	
		return this.printRectanglePoints(
			originX,originY, originX,originY+high, originX+width,originY+high, originX+width,originY
										);
	}
	
	//determina si el punto esta en la circunferencia
	isCircumferencePoint(pointx, pointy){
		//(x + ejex)^2 + (y + ejey)^2  =  r^2  form circunferencia
		//reemplazo x e y por pointx y pointy 
		if( this.sumCatetos(pointx, pointy) <= Math.pow(this.ratio,2) ){
			return true;
		}else{
			return false;
		}
	}
	
	calculateCateto(catNumber, eje){
		let numb = -catNumber + eje; 
		return Math.pow(numb,2);
	}
	
	sumCatetos(pointx, pointy ){
		return this.calculateCateto(pointx, this.ejex) + this.calculateCateto(pointy, this.ejey);
	}
	
					
//	point 	Y |	|-------------|
//			__|_________________
//	initialPointX	finalPointX
	isIntersectionLineX(initialPointX, finalPointX, pointY){
		//retorna true si algun punto de la lineaX horizontal esta en el circulo
		for(let f=initialPointX; f <= finalPointX ;f++){
			
			if( this.isCircumferencePoint(f, pointY) ){ 
				return true; 
			}
		}
		return false;
	}
	
//		  |  = finalPointY
//		  |  = initialPointY
//		_________________
//	point x
	isIntersectionLineY(initialPointY, finalPointY, pointX){
		//retorna true si algun punto de la lineaY vertical esta en el circulo
		for(let f=initialPointY; f <= finalPointY ;f++){
			
			if( this.isCircumferencePoint(pointX, f) ){ 
				return true; 
			}
		}
		return false;
	}
	
	
//	indicacion de las esquinas del rectangulo
//		B	C
//		A	D
//	A = origen
	
	isIntersectionRectangleCornersPoints( aX,aY, bX,bY, cX,cY, dX,dY ){
		
		//linea Vertical ejeY de   A -> B
		if( this.isIntersectionLineY( aY, bY,aX ) ){ return true };
		//linea Vertical ejeY de   D -> C
		if( this.isIntersectionLineY( dY, cY,dX ) ){ return true };
		
		//linea Horizontal ejeX de  A -> D
		if( this.isIntersectionLineX( aX, dX,aY ) ){ return true };
		//linea Horizontal ejeX de  B -> C
		if( this.isIntersectionLineX( bX, cX,bY ) ){ return true };
		
		return false;
	}
	
//		high	
//		A	   width
//	A = origen
    
	isIntersectionRectangle( originX,originY, high, width ){

		return this.isIntersectionRectangleCornersPoints(
			originX,originY, originX,originY+high, originX+width,originY+high, originX+width,originY
														);
	}
	
	
}