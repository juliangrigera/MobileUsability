'From Pharo8.0.0 of 22 January 2020 [Build information: Pharo-8.0.0+build.1124.sha.0932da82f08175e906b0e2a8052120c823374e9f (64 Bit)] on 24 June 2020 at 1:59:43.636402 pm'!
Object subclass: #MobileEvents
	instanceVariableNames: 'events'
	classVariableNames: 'singleton'
	package: ''!

!MobileEvents methodsFor: 'initialization' stamp: 'ClaudioRaverta 6/24/2020 13:52'!
events 

^events! !

!MobileEvents methodsFor: 'initialization' stamp: 'ClaudioRaverta 6/24/2020 13:53'!
addEvent: anEvent

events add: anEvent ! !

!MobileEvents methodsFor: 'initialization' stamp: 'ClaudioRaverta 6/24/2020 13:58'!
initialize 

events := OrderedCollection new! !

"-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- "!

MobileEvents class
	instanceVariableNames: ''!

!MobileEvents class methodsFor: 'instance creation' stamp: 'ClaudioRaverta 6/24/2020 13:58'!
getInstance

singleton ifNil: [ singleton := self new ].

^ singleton ! !
