Class {
	#name : #Scroll,
	#superclass : #UsabilityLogs,
	#instVars : [
		'distanceXpx',
		'distanceYpx',
		'speed',
		'direction'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Scroll class >> newFromDictionary: aDictionary [
	^ self new
		timestamp: (aDictionary at: 'timestamp');
		distanceXpx: (aDictionary at: 'x');
		distanceYpx: (aDictionary at: 'y')
]

{ #category : #accessing }
Scroll >> distanceXpx [
	^ distanceXpx
]

{ #category : #accessing }
Scroll >> distanceXpx: anObject [
	distanceXpx := anObject
]

{ #category : #accessing }
Scroll >> distanceYpx [
	^ distanceYpx
]

{ #category : #accessing }
Scroll >> distanceYpx: anObject [
	distanceYpx := anObject
]
