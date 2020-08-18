"
punto de coordenadas X y
	variable instancia 
		cordX
		cordY
		
	constructor
		CoordinatePoint newPoint:aCordX and:aCordY
"
Class {
	#name : #CoordinatePoint,
	#superclass : #Object,
	#instVars : [
		'cordX',
		'cordY'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
CoordinatePoint class >> newPoint:aCordX and:aCordY [

	^(self new) cordX:aCordX; cordY:aCordY. 
]

{ #category : #accessing }
CoordinatePoint >> cordX [

	^cordX.
]

{ #category : #accessing }
CoordinatePoint >> cordX:aCord [

	cordX:=aCord.
]

{ #category : #accessing }
CoordinatePoint >> cordY [ 

	^cordY.
]

{ #category : #accessing }
CoordinatePoint >> cordY:aCord [

	cordY:=aCord.
]
