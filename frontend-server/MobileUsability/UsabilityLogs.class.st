Class {
	#name : #UsabilityLogs,
	#superclass : #Object,
	#instVars : [
		'timestamp'
	],
	#category : #'MobileUsability-model'
}

{ #category : #accessing }
UsabilityLogs >> timestamp [
	^ timestamp
]

{ #category : #accessing }
UsabilityLogs >> timestamp: anObject [
	timestamp := anObject
]
