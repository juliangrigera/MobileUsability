Class {
	#name : #LogRegister,
	#superclass : #Object,
	#instVars : [
		'logs'
	],
	#classInstVars : [
		'soleInstance'
	],
	#category : #'MobileUsability-model'
}

{ #category : #'as yet unclassified' }
LogRegister class >> clearSoleInstance [
	soleInstance := nil
]

{ #category : #accessing }
LogRegister class >> soleInstance [

soleInstance ifNil: [soleInstance := self new ].
^soleInstance 
]

{ #category : #accessing }
LogRegister >> addLog:aLog [
	self logs add: aLog
]

{ #category : #initialization }
LogRegister >> initialize [
logs:=OrderedCollection new.
]

{ #category : #accessing }
LogRegister >> logs [
	^ logs
]
