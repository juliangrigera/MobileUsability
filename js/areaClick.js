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
	
	static newCircunferencia(pointx,pointy,ratio){
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
		return `pointX = ${this.ejex} pointY =  ${this.ejey} ratio = ${this.ratio}`;
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
	
    
}