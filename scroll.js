
  class ScrollPoints
  {  
    constructor(pointX, pointY)
    {
      this.pointX=pointX;
      this.pointY=pointY;
    }
  }

  class ScrollEventInfo
  {//parametros por defecto x = 0, y = 0
    constructor( )
    {
      this.class ="scroll";
      this.timestamp = Date.now();
      this.domScrollObj;
      this.arrayScrollPoints = new Array( );
    } 
    addScrollPoint(scrollPoint)
    {
      this.arrayScrollPoints.push(scrollPoint);
    }
    setDomScrollObj( domObj )
    {
      this.domScrollObj = domObj;
    }
  }

  // id del Proceso temporizado para enviar los datos despues del evento scroll
  var scrollTimerEventId;
  //Datos de los puntos x,y del desplazamiento del scroll a enviar
  var scrollEventInfo = new ScrollEventInfo();
  var domCurrentObj = null;
  scrollEventInitialize();



  function scrollEventInitialize()
  {
    console.log(">>>> Escroll Event ");
    //itera sobre todo el arbol de elementos de body buscando candidatos para el eventScroll 
    findScrollElements( document.body );
    //solo falta agregarle el evento al scroll de body que no es cuando los hijos son mas grandes
    //sino que la cantidad de hijos desborda al padre 

  }

  function findScrollElements( domNode )
  {
    let domCollection = domNode.children;
    for ( let i=0;i < domCollection.length ;i++)
    {
      detectElemtsScroll(domNode, domCollection);
      findScrollElements( domCollection[i] );
    }
  }

  function detectElemtsScroll(container, listContents)
  { //revisa si alguno de los hijos contendio es mayor al contenedor
    for ( let i=0;i < listContents.length ;i++)
    {
      if( isOverflowContent(container, listContents[i]) )
      {
        // console.log("event Scroll Insert");
        // console.log(container);
        setScrollEvent(container);   
        return true;
      }
    }
  }

  //si el elemento de contenido es mayor a contenedor hay scroll
  function isOverflowContent(container, content)
  {
    if( container.offsetWidth < content.offsetWidth )
    {
      return true;
    }
    if( container.offsetHeight < content.offsetHeight )
    {
      return true;
    }
    return false;
  }

  function setScrollEvent( domNode )
  {
    domNode.addEventListener("scroll",(event) => {

      if( domCurrentObj == null || event.target.isSameNode(domCurrentObj) )
      { 
        scrollEventInfo.addScrollPoint( new ScrollPoints(domNode.scrollLeft, domNode.scrollTop) );
        setTimerScrollEvent();
      }else
      { //stop timer
        clearTimeout(scrollTimerEventId); 
        //send info Scroll 
        sendDataScrollEvent();
        // reset info Data
        scrollEventInfo.addScrollPoint( new ScrollPoints(domNode.scrollLeft, domNode.scrollTop) );
        setTimerScrollEvent();
      }
      domCurrentObj = event.target;
    
    });
  }

  function setTimerScrollEvent()
  { //carga el nuevo evento y resetea el timer
    clearTimeout(scrollTimerEventId);
    scrollTimerEventId = window.setTimeout( sendDataScrollEvent, 1500 );
  }


  // scrollEventInfo es un objeto de la CLASE ScrollEventInfo que esta arriba
    // {
    //   class:"scroll",
    //   timestamp: Date.now(),
    //   domScrollObj:"referencia al obj que realizo el scroll",
    //   arrayScrollPoints:[ {"pointX":0,"pointY":52},{"pointX":0,"pointY":49} .... ];
    // }  
  
  //arrayScrollPoints  es una colleccion de obj "ScrollPoints" que solo tiene dos atributos x,y

// envia la info del evento scroll
  function sendDataScrollEvent()
  { //info Consola
    console.log(">>>>>>>>>>> Send scroll Event <<<<<<<<<<<");
    console.log(domCurrentObj);
    console.log( JSON.stringify(scrollEventInfo) );
    
    //referencia al obj que se realizo el evento
    scrollEventInfo.setDomScrollObj( createXPathFromElement( domCurrentObj ) );

  //>>>>>>>>> LLAMAR a la funcion que envia los Datos a SERVER <<<<<<<<<<<<<<
   // logEventPharoScroll( JSON.stringify( scrollEventInfo ) );
    
    resetScrollDataInfo();
  }

  function resetScrollDataInfo()
  {
    scrollEventInfo = new ScrollEventInfo();
    domCurrentObj = null;
  }

  //para enviar los datos a Pharo
  
    //   logEventPharoScroll(JSON.stringify({class:'Scroll', timestamp: new Date().getTime(), x: x,
    // y: y} ));

  
  // se tendría que refactorizar esto
  function logEventPharoScroll (jsonElements) {
    var http = new XMLHttpRequest ();
    var url = "http://localhost:1701/register";
  
  
    http.open("POST", url, true);
  
  
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
        alert(http.responseText);
        }
    }
   http.send(jsonElements);
  }

  // function sendDataScrollEvent2()
  // { 
  //   const data = scrollEventInfo;
  //   //reset initial data 
  //   scrollEventInfo = new ScrollEventInfo();

  //   fetch('http://localhost:8000/ejemplo.php', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })                        //change recive json - text
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log('Success:', data);
  //    })
  //    .catch((error) => {
  //      console.error('Error:', error);
  //    });

  // }

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

