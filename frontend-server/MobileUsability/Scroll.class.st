Class {
	#name : #Scroll,
	#superclass : #UsabilityLogs,
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Scroll class >> newFromDictionary: aDictionary [
	^ self new
	name: 'Scroll';
		domRefObject: (aDictionary at: 'domScrollObj');
		timestamp: (DateAndTime fromUnixTime: (aDictionary at: 'timestamp') / 1000);
		scrollPointsJson: (aDictionary at: 'arrayScrollPoints')
]

{ #category : #accessing }
Scroll >> addScrollPoint: aCordPoint [
	self scrollPoints add: aCordPoint
]

{ #category : #accessing }
Scroll >> initialize [
	"init"

	scrollPoints := OrderedCollection new
]

{ #category : #testing }
Scroll >> isScroll [
	^ true
]

{ #category : #accessing }
Scroll >> printAllScrollPoints [
^scrollPoints
		inject: ''
		into: [ :text :each | text , each printPoints ]
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
