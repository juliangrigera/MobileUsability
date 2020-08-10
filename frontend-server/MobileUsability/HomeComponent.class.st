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

{ #category : #'class initialization' }
HomeComponent class >> initialize [
	| app |
	app := WAAdmin register: self asApplicationAt: 'logsviewer'.
	app
		addLibrary: JQDeploymentLibrary;
		addLibrary: SBSDevelopmentLibrary
]

{ #category : #initialization }
HomeComponent >> initialize [
super initialize .
	sistema := LogRegister soleInstance
]

{ #category : #rendering }
HomeComponent >> renderBodyOn: html [
	html heading
		level: 3;
		with: 'MissClick Logs!'.
	self renderLogsOn: html
]

{ #category : #rendering }
HomeComponent >> renderContentOn: html [
	html heading: 'Logs Viewer'.
	html horizontalRule.
	self renderBodyOn: html.
	html heading level2 with: 'Examples'.
	html horizontalRule
]

{ #category : #rendering }
HomeComponent >> renderLogOn: html element: each [
	html horizontalRule.
	html text: each timestamp.
	html break.
	html
		text: 'Coordenada X:  ';
		space.
	html text: each cordX.
	html
		break;
		text: 'Coordenada Y:  ';
		space.
	html text: each cordY.
	html
		break;
		text: 'Elementos:  ';
		space.
	html text: each elements.
	html break.
	html horizontalRule
]

{ #category : #rendering }
HomeComponent >> renderLogsOn: html [
	sistema logs
		ifNil: [ html text: 'No hay logs.' ]
		ifNotNil: [ sistema logs do: [ :ele | self renderLogOn: html element:ele  ] ]
]

{ #category : #rendering }
HomeComponent >> rendererClass [
	^ SBSHtmlCanvas

]
