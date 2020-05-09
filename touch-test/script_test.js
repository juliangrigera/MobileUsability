//touch events - touchstart, touchend, touchmove, touchcancel
//  https://developers.google.com/web/fundamentals/design-and-ux/input/touch?hl=es#controlar_gestos_con_acciones_t%C3%A1ctiles 
// https://css-tricks.com/almanac/properties/t/touch-action/   touch-action (regla de css) te permite inhabilitar gestos implementados por un navegador. 
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures acá algo tiene que haber.. 
document.querySelector('body').addEventListener('touchstart', f);
document.querySelector('body').addEventListener('touchend', f);
document.querySelector('body').addEventListener('touchmove', f);
        
function f(ev){
console.log ("Touch!")
console.log( ev.touches, ev.type );
}
        
