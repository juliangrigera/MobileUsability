Class {
	#name : #Misclick,
	#superclass : #UsabilityLogs,
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
Misclick class >> newFromDictionary: aDictionary [
	^ self new
	name: 'Misclick';
		cordX: (aDictionary at: 'x');
		cordY: (aDictionary at: 'y');
		elements: (aDictionary at: 'elements');
		timestamp: (DateAndTime fromUnixTime: (aDictionary at: 'timestamp') / 1000)
]

{ #category : #accessing }
Misclick >> isMissclick [
	^ true
]
