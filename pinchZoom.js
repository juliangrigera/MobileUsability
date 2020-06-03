
// Global vars to cache event state
var evCache = new Array();
var prevDiff = -1;



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
   document.getElementById("t1X").innerText = evCache[0].clientX.toFixed(2);
   document.getElementById("t2X").innerText = evCache[1].clientX.toFixed(2);
   document.getElementById("t1Y").innerText = evCache[0].clientY.toFixed(2);
   document.getElementById("t2Y").innerText = evCache[1].clientY.toFixed(2);
   if (prevDiff > 0) {
     if (curDiff > prevDiff) {
       // The distance between the two pointers has increased
  
       zoomInfo.style.background  = "pink";
     }
     if (curDiff < prevDiff) {
       // The distance between the two pointers has decreased
  
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
  ev.target.style.background = "white";
  ev.target.style.border = "1px solid black";
 
  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) prevDiff = -1;
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




  var zoomInfo=document.getElementById("target");
  window.onpointerdown = pointerdown_handler;
  window.onpointermove = pointermove_handler;

 // Use same handler for pointer{up,cancel,out,leave} events since
 // the semantics for these events - in this app - are the same.
 window.onpointerup = pointerup_handler;
 window.onpointercancel = pointerup_handler;
 window.onpointerout = pointerup_handler;
 window.onpointerleave = pointerup_handler;


