
// Global vars to cache event state
var evCache = new Array();
var prevDiff = -1;
var myVar;

function pinchReport(zeroX, oneX, zeroY, oneY) {
  myVar = setTimeout(function(){elementsInPinch(zeroX, oneX, zeroY, oneY)}, 1000);
}

function stopPinchReport() {
  clearTimeout(myVar);
}


function pointerdown_handler(ev) {
 // The pointerdown event signals the start of a touch interaction.
 // This event is cached to support 2-finger gestures
 evCache.push(ev);
 
}

function pointermove_handler(ev) {
 // This function implements a 2-pointer horizontal pinch/zoom gesture. 
 //
 // If the distance between the two pointers has increased (zoom in), 
 // the taget element's background is changed to "pink" and if the 
 // distance is decreasing (zoom out), the color is changed to "lightblue".
 //
 // This function sets the target element's border to "dashed" to visually
 // indicate the pointer's target received a move event.

 
 // Find this event in the cache and update its record with this event
 for (var i = 0; i < evCache.length; i++) {
   if (ev.pointerId == evCache[i].pointerId) {
      evCache[i] = ev;
   break;
   }
 }

 // If two pointers are down, check for pinch gestures
 if (evCache.length == 2) {
   // Calculate the distance between the two pointers
   var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
   document.getElementById("t1X").innerText = evCache[0].pageX.toFixed(2);
   document.getElementById("t2X").innerText = evCache[1].pageX.toFixed(2);
   document.getElementById("t1Y").innerText = evCache[0].pageY.toFixed(2);
   document.getElementById("t2Y").innerText = evCache[1].pageY.toFixed(2);
   if (prevDiff > 0) {
     if (curDiff > prevDiff) {
       // The distance between the two pointers has increased
       stopPinchReport();
       pinchReport(evCache[0].clientX, evCache[1].clientX, evCache[0].clientY, evCache[1].clientY);
       zoomInfo.style.background  = "pink";
     }
     if (curDiff < prevDiff) {
       // The distance between the two pointers has decreased
       stopPinchReport();
       pinchReport(evCache[0].clientX, evCache[1].clientX, evCache[0].clientY, evCache[1].clientY);
       zoomInfo.style.background  = "lightblue";
     }
   }

   // Cache the distance for the next move event 
   prevDiff = curDiff;
 }
}

function pointerup_handler(ev) {

  // Remove this pointer from the cache and reset the target's
  // background and border
  remove_event(ev);
  
 
  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
   
  }
}
function pointerup2_handler(ev) {

  // Remove this pointer from the cache and reset the target's
  // background and border
  remove_event(ev);
  
 
  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;

  }
}

function remove_event(ev) {
 // Remove this event from the target's cache
 for (var i = 0; i < evCache.length; i++) {
   if (evCache[i].pointerId == ev.pointerId) {
     evCache.splice(i, 1);
     break;
   }
 }
}

function elementsInPinch(zeroX, zeroY, oneX, oneY){
 
  todos = document.getElementsByTagName("*");
  let htmlElements = new Array();
 
 
  for (var i=0, max=todos.length; i < max; i++) {
      if( insidePinch(zeroX, oneX, zeroY, oneY, todos[i].getBoundingClientRect()) ){
        console.log(createXPathFromElement(todos[i]));
        console.log("Font size: " + window.getComputedStyle(todos[i]).fontSize );
        elemento = {eventType: 'zoomPinch', FontSize: window.getComputedStyle(todos[i]).fontSize, XPath: createXPathFromElement(todos[i]) };


    
          todos[i].classList.add("boxShadowZoomOut");
           htmlElements.push(elemento);
      }
  }
  logEventPharo(JSON.stringify(htmlElements));
}

function insidePinch(x1, x2, y1, y2, elemRect){
if (Math.abs(x1 - x2) > Math.abs(y1 - y2)){
//zoomPinch Horizontal

//hago que x1 sea el dedo que está más a la izquierda, para facilitar comparaciones
if (x1 > x2){
  aux = x1;
  x1 = x2;
  x2 = aux;
}

if(elemRect.left >= x1 && elemRect.left <= x2 || elemRect.right >= x1 && elemRect.right <= x2 ){
  if(elemRect.top <= y1 && elemRect.bottom >= y1 || elemRect.top <= y2 && elemRect.bottom >= y2){
      return true;
  }
return false;
}
else{
  //zoomPinch Vertical

  //hago que y1 sea el dedo que está más arriba, para facilitar comparaciones

  if (y1 > y2){
    aux = y1;
    y1 = y2;
    y2 = aux;
  }
  if(elemRect.top >= y1 && elemRect.top <= y2 || elemRect.bottom >= y1 && elemRect.bottom <= y2 ){
    if(elemRect.left <= x1 && elemRect.right >= x1 || elemRect.left <= x2 && elemRect.right >= x2){
        return true;
    }
  return false;
  }
}
}}

    






 function removeStyleElementsInRadioPrevious(){
  //remover los elementos con boxShadow
 
  let htmlItemsInRadio = document.getElementsByClassName("boxShadowZoomOut");
  

  for(i=0; i < htmlItemsInRadio.length ;i++){
      htmlItemsInRadio[i].classList.remove("boxShadowZoomOut");
  };

}  
function logEventPharo (jsonElements) {
  var http = new XMLHttpRequest ();
  var url = "http://localhost:1701/prueba";


  http.open("POST", url, true);


  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) { 
      //aqui obtienes la respuesta de tu peticion
      alert(http.responseText);
      }
  }
  http.send(jsonElements);
}

  var zoomInfo=document.getElementById("target");
  window.onpointerdown = pointerdown_handler;
  window.onpointermove = pointermove_handler;

 // Use same handler for pointer{up,cancel,out,leave} events since
 // the semantics for these events - in this app - are the same.
 window.onpointerup = pointerup_handler;
 window.onpointercancel = pointerup_handler;
 window.onpointerout = pointerup_handler;
 window.onpointerleave = pointerup_handler;

 document.addEventListener('touchend', (event) => {
  removeStyleElementsInRadioPrevious();
});
 

function createXPathFromElement(elm) { 
  var allNodes = document.getElementsByTagName('*'); 
  for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
  { 
      if (elm.hasAttribute('id')) { 
              var uniqueIdCount = 0; 
              for (var n=0;n < allNodes.length;n++) { 
                  if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                  if (uniqueIdCount > 1) break; 
              }; 
              if ( uniqueIdCount == 1) { 
                  segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                  return segs.join('/'); 
              } else { 
                  segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
              } 
      } else if (elm.hasAttribute('class')) { 
          segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
      } else { 
          for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
              if (sib.localName == elm.localName)  i++; }; 
              segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
      }; 
  }; 
  return segs.length ? '/' + segs.join('/') : null; 
}; 

function lookupElementByXPath(path) { 
  var evaluator = new XPathEvaluator(); 
  var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
  return  result.singleNodeValue; 
} 