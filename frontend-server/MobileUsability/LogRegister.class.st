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
LogRegister class >> setupServer [
"Configuracion de TeaPot"
|server|

server := Teapot configure: {(#debugMode -> true)}.
server
    GET: '/welcome/<nombre>' -> [:req | 'Hello World!', (req at: #nombre)];
	 GET: '/bye' -> 'bye bye World!';

	
POST: '/register' -> [:request || log | 
log:=(NeoJSONReader fromString: request contents ).
LogRegister soleInstance addLog:((Smalltalk at:(log at:'class') asSymbol ) newFromDictionary: log).	
	
		TeaResponse ok
						headerName: 'Access-Control-Allow-Origin' value: '*';
						yourself
];
	 start
.
]

{ #category : #accessing }
LogRegister class >> soleInstance [

soleInstance ifNil: [soleInstance := self new ].
^soleInstance 
]

{ #category : #accessing }
LogRegister class >> soleInstance: anObject [
	soleInstance := anObject
]

{ #category : #accessing }
LogRegister >> addLog:aLog [
	self logs add: aLog
]

{ #category : #accessing }
LogRegister >> clearSoleInstance [
	self class  soleInstance: nil
]

{ #category : #'as yet unclassified' }
LogRegister >> getMcLogs [
	^ self logs select: [ :log | log isMissclick ]
]

{ #category : #'as yet unclassified' }
LogRegister >> getPzLogs [
	^ self logs select: [ :log | log isPinchZoom ]
]

{ #category : #'as yet unclassified' }
LogRegister >> getScLogs [
	^ self logs select:[ :log | log isScroll ].
]

{ #category : #initialization }
LogRegister >> initialize [
logs:=OrderedCollection new.
]

{ #category : #accessing }
LogRegister >> logs [
	^ logs
]
