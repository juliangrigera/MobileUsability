Class {
	#name : #BaselineOfMobileUsability,
	#superclass : #BaselineOf,
	#category : #BaselineOfMobileUsability
}

{ #category : #baselines }
BaselineOfMobileUsability >> baseline: spec [
	<baseline>
	spec
		for: #'pharo8.x'
		do: [ self bootstrap: spec.
			spec
				blessing: #baseline;
				repository: 'https://github.com/juliangrigera/MobileUsability.git';
				package: 'MobileUsability';
				package: 'MobileUsability-ui'
					with: [ spec requires: #('Bootstrap4') ] ]
]

{ #category : #baseline }
BaselineOfMobileUsability >> bootstrap: arg1 [
	arg1
		baseline: 'Bootstrap4'
		with: [ | tmp2 |
			tmp2 := arg1.
			tmp2
				loads: #('default');
				repository: 'github://astares/Seaside-Bootstrap4:master/src' ]

]
