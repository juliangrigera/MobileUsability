Class {
	#name : #BaselineOfMobileUsability,
	#superclass : #BaselineOf,
	#category : #BaselineOfMobileUsability
}

{ #category : #baselines }
BaselineOfMobileUsability >> baseline: arg1 [
	<baseline>
	arg1
		for: #'pharo8.x'
		do: [ self bootstrap: arg1.
			arg1
				blessing: #baseline;
				repository: 'https://github.com/juliangrigera/MobileUsability.git';
				package: 'MobileUsability-ui'
					with: [ arg1 requires: #('Bootstrap4') ];
				package: 'MobileUsability' ]
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
