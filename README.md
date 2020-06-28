# Detección automática de problemas de usabilidad en la Web Móvil
Este proyecto está basado en  programar un detector automático de problemas de usabilidad en la Web Mobile.

Para esto nos dedicamos en estudiar la interacción y buscar patrones de problemas, ya sea en la literatura, o investigando nosotros:filmando, guardando logs. 

Luego de haber logrado detectar esos patrones automáticamente, lo que hacemos es  también programar la re-escritura de la UI para poder corregir esos problemas, logrando  que todo pueda suceder automáticamente. 

## Involucrados en el proyecto:
* @juliangrigeras
* @claudiorave
* @cano92
* @gastonginestet


--------------------------------------------------------------------------------------------------
#### MobileUsability
Link de la página de prueba: 

https://htmlpreview.github.io/?https://github.com/juliangrigera/MobileUsability/blob/master/pagina.html

--------------------------------------------------------------------------------------------------
## Intalación en Pharo
En un [Pharo 8.0](https://pharo.org/download) , ejecutá este codigo para instalar el paquete `MobileUsability`:

``` smalltalk
Metacello new
	baseline: 'MobileUsability';
	repository: 'github://juliangrigera/MobileUsability';
	load.
```

  
  
