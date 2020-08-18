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
