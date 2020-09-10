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
HomeComponent >> clearLogs [
	self sistema clearSoleInstance.
	self call: self class new
]

{ #category : #initialization }
HomeComponent >> initialize [
super initialize .
	sistema := LogRegister soleInstance
]

{ #category : #rendering }
HomeComponent >> renderBodyOn: html [

	self renderClearButtonOn: html.
	self renderLogsOn: html
]

{ #category : #initialization }
HomeComponent >> renderClearButtonOn: html [
	html
		form: [ html outlineButton
				beDanger;
				callback: [ self clearLogs ];
				with: 'Clear logs' ]
]

{ #category : #rendering }
HomeComponent >> renderContentOn: html [
	html heading: 'Logs Viewer'.
		html navigationLink
		url: 'https://github.com/juliangrigera/MobileUsability';
		with: 'MobileUsability'.
	html horizontalRule.

	self renderBodyOn: html
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
	self sistema logs
		ifNil: [ html text: 'No hay logs.' ]
		ifNotNil: [ html horizontalRule.
			html heading
				level: 3;
				with: 'Logs:'.
				self renderTableHeaderOn:html.
			"html horizontalRule.
			html heading
				level: 3;
				with: 'MissClick Logs!'.
			self renderMcLogsOn: html col: self sistema getMcLogs.
			html horizontalRule.
			html heading
				level: 3;
				with: 'PinchZoom Logs!'.
			self renderPzLogsOn: html col: self sistema getPzLogs.
			html horizontalRule.
			html heading
				level: 3;
				with: 'Scroll Logs!'.
			self renderScLogsOn: html col: self sistema getScLogs" ]
]

{ #category : #rendering }
HomeComponent >> renderMcLogsOn: html col: aMcCol [

	html table
		class: 'table table-bordered';
		with: [ html
				tableHead: [ html
						tableRow: [ html tableHeading: 'Timestamp'.
							html tableHeading: 'Cord X'.
							html tableHeading: 'Cord Y'.
							html tableHeading: 'Elementos' ] ].
			html
				tableBody: [ aMcCol
						do: [ :ele | 
							html
								tableRow: [ html tableData: ele timestamp.
									html tableData: ele cordX.
									html tableData: ele cordY.
									html tableData: ele elements ] ] ] ].
]

{ #category : #rendering }
HomeComponent >> renderPzLogsOn: html col: aPzCol [
	html table
		class: 'table table-bordered';
		with: [ html
				tableHead: [ html
						tableRow: [ html tableHeading: 'Timestamp'.
							html tableHeading: 'Elementos' ] ].
			html
				tableBody: [ aPzCol
						do: [ :ele | 
							html
								tableRow: [ html tableData: ele timestamp.
									html tableData: ele elements ] ] ] ].
]

{ #category : #rendering }
HomeComponent >> renderScLogsOn: html col: aScCol [
	html table
		class: 'table table-bordered';
		with: [ html
				tableHead: [ html
						tableRow: [ html tableHeading: 'Timestamp'.
							html tableHeading: 'Dom Ref '.
							html tableHeading: 'Scroll Points' ] ].
			html
				tableBody: [ aScCol
						do: [ :ele | 
							html
								tableRow: [ html tableData: ele timestamp.
									html tableData: ele domRefObject.
									html tableData: ele printAllScrollPoints  ] ] ] ]
]

{ #category : #rendering }
HomeComponent >> renderTableHeaderOn: html [
	html table
		class: 'table table-bordered';
		with: [ html
				tableHead: [ html
						tableRow: [ html tableHeading: 'Tipo de log'.
							html tableHeading: 'Timestamp'.
							html tableHeading: 'Cord X'.
							html tableHeading: 'Cord Y'.
							html tableHeading: 'Elementos'.
							html tableHeading: 'Dom Ref '.
							html tableHeading: 'Scroll Points' ] ].
			html
				tableBody: [ self sistema logs
						do: [ :ele | 
							html
								tableRow: [ html tableData: ele name.
									html tableData: ele timestamp.
									html tableData: ele cordX.
									html tableData: ele cordY.
									html tableData: ele elements .
									html tableData: ele domRefObject.
									html tableData: ele printAllScrollPoints] ] ] ]
]

{ #category : #rendering }
HomeComponent >> rendererClass [
	^ SBSHtmlCanvas

]

{ #category : #accessing }
HomeComponent >> sistema [
	^ sistema
]
