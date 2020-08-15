Class {
	#name : #PinchZoom,
	#superclass : #UsabilityLogs,
	#instVars : [
		'elements'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
PinchZoom class >> newFromDictionary: aDictionary [
	^ self new
		timestamp: (DateAndTime fromUnixTime: (aDictionary at: 'timestamp') / 1000);
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
