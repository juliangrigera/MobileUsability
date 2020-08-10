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

{ #category : #accessing }
UsabilityLogs >> timestamp [
	^ timestamp
]

{ #category : #accessing }
UsabilityLogs >> timestamp: anObject [
	timestamp := anObject
]
