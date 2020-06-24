Class {
	#name : #MissClickLogs,
	#superclass : #UsabilityLogs,
	#instVars : [
		'cordX',
		'cordY',
		'elements'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'instance creation' }
MissClickLogs class >> newWithCordX: aCordx cordY: aCordY elements: aCol [
	^ self new
		cordX: aCordx;
		cordY: aCordY;
		elements: aCol;
		timestamp: DateAndTime now
]

{ #category : #accessing }
MissClickLogs >> cordX [
	^ cordX
]

{ #category : #accessing }
MissClickLogs >> cordX: anObject [
	cordX := anObject
]

{ #category : #accessing }
MissClickLogs >> cordY [
	^ cordY
]

{ #category : #accessing }
MissClickLogs >> cordY: anObject [
	cordY := anObject
]

{ #category : #accessing }
MissClickLogs >> elements [
	^ elements
]

{ #category : #accessing }
MissClickLogs >> elements: anObject [
	elements := anObject
]
