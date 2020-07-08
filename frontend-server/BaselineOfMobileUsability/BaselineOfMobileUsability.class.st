Class {
	#name : #BaselineOfMobileUsability,
	#superclass : #BaselineOf,
	#category : #BaselineOfMobileUsability
}

{ #category : #baselines }
BaselineOfMobileUsability >> baseline: spec [
"Instala las dependencias y el paquete de  MobileUsability"
	<baseline>
	spec
		for: #'pharo8.x'
		do: [ self bootstrap: spec.
			self neojson: spec.
			self teapot: spec.
			spec
				blessing: #baseline;
				repository: 'https://github.com/juliangrigera/MobileUsability.git';
				package: 'MobileUsability'
					with: [ spec requires: #('Bootstrap4') ] ]
]

{ #category : #baseline }
BaselineOfMobileUsability >> bootstrap: spec [
	spec
		baseline: 'Bootstrap4'
		with: [ | tmp2 |
			tmp2 := spec.
			tmp2
				loads: #('default');
				repository: 'github://astares/Seaside-Bootstrap4:master/src' ]
]

{ #category : #baseline }
BaselineOfMobileUsability >> neojson: spec [
	spec
		baseline: 'NeoJSON'
		with: [ | tmp2 |
			tmp2 := spec.
			tmp2
				loads: #('default');
				repository: 'github://svenvc/NeoJSON/repository' ]
]

{ #category : #baseline }
BaselineOfMobileUsability >> teapot: spec [
	spec
		baseline: 'Teapot'
		with: [ | tmp2 |
			tmp2 := spec.
			tmp2
				loads: #('default');
				repository: 'github://zeroflag/teapot:master/source' ]
]
