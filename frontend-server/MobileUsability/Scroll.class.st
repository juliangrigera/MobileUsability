"
- guarda informacion recibida de un evento scroll 
	variables
		domRefOject 		--referecia string al xpath del objeto Dom html
		timestamp 		-- timestamp del evento
		scrollPoints 	--colleccion de coordenadas (CoordinatePoint) de desplazamiento en Eje ( x, y ) del evento 

- construct
	newFromDictionary:aJson

- aJson format
  		{
    	   class:""scroll"",
    	   timestamp: Date.now(),
    	  	domScrollObj:""referencia al obj que realizo el scroll""
    	   arrayScrollPoints:[ {""pointX"":0,""pointY"":1},  .... ];
    	 }  
"
Class {
	#name : #Scroll,
	#superclass : #UsabilityLogs,
	#instVars : [
		'domRefObject',
		'scrollPoints'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Scroll class >> newFromDictionary:aJsonDictionary [
	"constructor que recibe un Obj Json"
	
	^(self new)domRefObject:(aJsonDictionary at:'domScrollObj');
				timestamp:(aJsonDictionary at:'timestamp');
				scrollPointsJson:(aJsonDictionary at:'arrayScrollPoints').

]

{ #category : #initialization }
Scroll >> addScrollPoint:aCordPoint [
	
	(self scrollPoints) add:aCordPoint. 
]

{ #category : #initialization }
Scroll >> domRefObject [
	
	^domRefObject.
]

{ #category : #initialization }
Scroll >> domRefObject:aReference [
	
	domRefObject:=aReference.
]

{ #category : #initialization }
Scroll >> initialize [ 
	"init"
	
	scrollPoints:= OrderedCollection new.
]

{ #category : #initialization }
Scroll >> scrollPoints [
	
	^scrollPoints.
]

{ #category : #initialization }
Scroll >> scrollPointsJson:aJSONCoordinatesDictionary [
	"recibe un colleccion ( Dictionary )  de coordenadas JSON  y crea una colleccion de objetos  --CoordinatePoint  "
	" [ { pointX:0, pointY:1 }, { pointX:0, pointY:2 },  .... ] "
	
	aJSONCoordinatesDictionary do:[:aCoordinate | 
			self addScrollPoint: (CoordinatePoint newPoint:(aCoordinate at:'pointX') and:(aCoordinate at:'pointY')  
		)].
]
