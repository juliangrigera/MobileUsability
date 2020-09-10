Class {
	#name : #UsabilityLogs,
	#superclass : #Object,
	#instVars : [
		'name',
		'timestamp',
		'cordX',
		'cordY',
		'elements',
		'percentage',
		'domRefObject',
		'scrollPoints',
		'speed',
		'direction'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
UsabilityLogs class >> newFromDictionary: aDictionary [
	^ self subclassResponsibility 
]

{ #category : #accessing }
UsabilityLogs >> cordX [
	^ cordX
]

{ #category : #accessing }
UsabilityLogs >> cordX: anObject [
	cordX := anObject
]

{ #category : #accessing }
UsabilityLogs >> cordY [
	^ cordY
]

{ #category : #accessing }
UsabilityLogs >> cordY: anObject [
	cordY := anObject
]

{ #category : #accessing }
UsabilityLogs >> direction [
	^ direction
]

{ #category : #accessing }
UsabilityLogs >> direction: anObject [
	direction := anObject
]

{ #category : #accessing }
UsabilityLogs >> domRefObject [
	^ domRefObject
]

{ #category : #accessing }
UsabilityLogs >> domRefObject: anObject [
	domRefObject := anObject
]

{ #category : #accessing }
UsabilityLogs >> elements [
	^ elements
]

{ #category : #accessing }
UsabilityLogs >> elements: anObject [
	elements := anObject
]

{ #category : #testing }
UsabilityLogs >> isMissclick [
^ false
]

{ #category : #testing }
UsabilityLogs >> isPinchZoom [
	^ false
]

{ #category : #testing }
UsabilityLogs >> isScroll [
	^ false
]

{ #category : #accessing }
UsabilityLogs >> name [
	^ name
]

{ #category : #accessing }
UsabilityLogs >> name: anObject [
	name := anObject
]

{ #category : #accessing }
UsabilityLogs >> percentage [
	^ percentage
]

{ #category : #accessing }
UsabilityLogs >> percentage: anObject [
	percentage := anObject
]

{ #category : #accessing }
UsabilityLogs >> scrollPoints [
	^ scrollPoints
]

{ #category : #accessing }
UsabilityLogs >> scrollPoints: anObject [
	scrollPoints := anObject
]

{ #category : #accessing }
UsabilityLogs >> speed [
	^ speed
]

{ #category : #accessing }
UsabilityLogs >> speed: anObject [
	speed := anObject
]

{ #category : #accessing }
UsabilityLogs >> timestamp [
	^ timestamp
]

{ #category : #accessing }
UsabilityLogs >> timestamp: anObject [
	timestamp := anObject
]
