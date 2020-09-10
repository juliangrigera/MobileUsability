Class {
	#name : #PinchZoom,
	#superclass : #UsabilityLogs,
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
PinchZoom class >> newFromDictionary: aDictionary [
	^ self new
	name: 'PinchZoom';
		timestamp: (DateAndTime fromUnixTime: (aDictionary at: 'timestamp') / 1000);
		elements: (aDictionary at: 'elements')
]

{ #category : #testing }
PinchZoom >> isPinchZoom [
	^ true
]
