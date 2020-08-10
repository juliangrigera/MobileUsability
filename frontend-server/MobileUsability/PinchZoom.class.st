Class {
	#name : #PinchZoom,
	#superclass : #UsabilityLogs,
	#instVars : [
		'percentage',
		'elements'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
PinchZoom class >> newFromDictionary: aDictionary [
	^ self new
		timestamp: (aDictionary at: 'timestamp');
		elements: (aDictionary at: 'elements')
]

{ #category : #accessing }
PinchZoom >> elements [
	^ elements
]

{ #category : #accessing }
PinchZoom >> elements: anObject [
	elements := anObject
]

{ #category : #accessing }
PinchZoom >> percentage [
	^ percentage
]

{ #category : #accessing }
PinchZoom >> percentage: anObject [
	percentage := anObject
]
