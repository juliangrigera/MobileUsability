"
""Para iniciar la pagina.""
WAAdmin register: HomeComponent  asApplicationAt:'logsviewer' .

--------------------------------------------
""Configuracion de TeaPot""
|server|

server := Teapot configure: {(#debugMode -> true)}.
server
    GET: '/welcome/<nombre>' -> [:req | 'Hello World!', (req at: #nombre)];
	 GET: '/bye' -> 'bye bye World!';

	
POST: '/registermc' -> [:request | 
""	NeoJSONWriter toStringPretty: request contest.""
LogRegister soleInstance addLog: (NeoJSONReader fromString: request contents ) .
	
		TeaResponse ok
						headerName: 'Access-Control-Allow-Origin' value: '*';
						yourself
];
	 start
	
	


"
Class {
	#name : #HomeComponent,
	#superclass : #WAComponent,
	#instVars : [
		'sistema'
	],
	#category : #'MobileUsability-ui'
}

{ #category : #initialization }
HomeComponent >> initialize [
super initialize.
	sistema := LogRegister soleInstance
]

{ #category : #rendering }
HomeComponent >> renderBodyOn: aCanvas [
	aCanvas heading
		level: 2;
		with: 'MissClick Logs!'.
	self renderLogsOn: aCanvas.
]

{ #category : #rendering }
HomeComponent >> renderContentOn: aCanvas [
	aCanvas heading: 'Logs Viewer'.
	aCanvas horizontalRule.
	self renderBodyOn: aCanvas.
	aCanvas horizontalRule
]

{ #category : #rendering }
HomeComponent >> renderJSONOn: aCanvas element: each [
	aCanvas horizontalRule.
	aCanvas text: (NeoJSONWriter
		new;
		toStringPretty: each).
	aCanvas break.

	aCanvas horizontalRule
]

{ #category : #rendering }
HomeComponent >> renderLogOn: aCanvas element: each [
	aCanvas horizontalRule.
	aCanvas text: each timestamp.
	aCanvas break.
	aCanvas
		text: 'Coordenada X:  ';
		space.
	aCanvas text: each cordX.
	aCanvas
		break;
		text: 'Coordenada Y:  ';
		space.
	aCanvas text: each cordY.
	aCanvas
		break;
		text: 'Elementos:  ';
		space.
	aCanvas text: each elements.
	aCanvas break.
	aCanvas horizontalRule
]

{ #category : #rendering }
HomeComponent >> renderLogsOn: aCanvas [
	sistema logs
		ifNil: [ aCanvas text: 'No hay logs.' ]
		ifNotNil: [ sistema logs do: [ :ele | self renderJSONOn: aCanvas element: ele ] ]
]
