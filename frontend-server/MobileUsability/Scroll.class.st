Class {
	#name : #Scroll,
	#superclass : #UsabilityLogs,
	#instVars : [
		'domRefObject',
		'scrollPoints',
		'speed',
		'direction'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Scroll class >> newFromDictionary: aDictionary [
	^ self new
		domRefObject: (aDictionary at: 'domScrollObj');
		timestamp: (DateAndTime fromUnixTime: (aDictionary at: 'timestamp') / 1000);
		
		scrollPointsJson: (aDictionary at: 'arrayScrollPoints')
]

{ #category : #accessing }
Scroll >> addScrollPoint: aCordPoint [
	self scrollPoints add: aCordPoint
]

{ #category : #accessing }
Scroll >> domRefObject [
	^ domRefObject
]

{ #category : #accessing }
Scroll >> domRefObject: aReference [
	domRefObject := aReference
]

{ #category : #accessing }
Scroll >> initialize [
	"init"

	scrollPoints := OrderedCollection new
]

{ #category : #accessing }
Scroll >> scrollPoints [
	^ scrollPoints
]

{ #category : #accessing }
Scroll >> scrollPointsJson: aJSONCoordinatesDictionary [
	"recibe un colleccion ( Dictionary )  de coordenadas JSON  y crea una colleccion de objetos  --CoordinatePoint  "

	" [ { pointX:0, pointY:1 }, { pointX:0, pointY:2 },  .... ] "

	aJSONCoordinatesDictionary
		do: [ :aCoordinate | 
			self
				addScrollPoint:
				 (CoordinatePoint
						newPoint: (aCoordinate at: 'pointX')
						and: (aCoordinate at: 'pointY')) ]
]
