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
		do: [spec blessing: #baseline. 
			spec
				repository: 'https://github.com/juliangrigera/MobileUsability.git'.
			spec package: 'MobileUsability' ]
]
