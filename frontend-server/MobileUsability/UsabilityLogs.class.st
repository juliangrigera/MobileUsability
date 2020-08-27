Class {
	#name : #UsabilityLogs,
	#superclass : #Object,
	#instVars : [
		'timestamp'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
UsabilityLogs class >> newFromDictionary: aDictionary [
	^ self subclassResponsibility 
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
UsabilityLogs >> timestamp [
	^ timestamp
]

{ #category : #accessing }
UsabilityLogs >> timestamp: anObject [
	timestamp := anObject
]
