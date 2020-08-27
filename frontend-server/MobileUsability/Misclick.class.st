Class {
	#name : #Misclick,
	#superclass : #UsabilityLogs,
	#instVars : [
		'cordX',
		'cordY',
		'elements'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Misclick class >> newFromDictionary: aDictionary [
	^ self new
		cordX: (aDictionary at: 'x');
		cordY: (aDictionary at: 'y');
		timestamp: (DateAndTime fromUnixTime: ((aDictionary at: 'timestamp') / 1000))
]

{ #category : #accessing }
Misclick >> cordX [
	^ cordX
]

{ #category : #accessing }
Misclick >> cordX: anObject [
	cordX := anObject
]

{ #category : #accessing }
Misclick >> cordY [
	^ cordY
]

{ #category : #accessing }
Misclick >> cordY: anObject [
	cordY := anObject
]

{ #category : #accessing }
Misclick >> elements [
	^ elements
]

{ #category : #accessing }
Misclick >> elements: anObject [
	elements := anObject
]

{ #category : #accessing }
Misclick >> isMissclick [
	^ true
]
