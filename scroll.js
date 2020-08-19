
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
      this.class ="Scroll";
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
    console.log(">>>> Escroll Event Initialize ");
    //itera sobre todo el arbol de elementos de body buscando candidatos para el eventScroll 
    findScrollElements( document.body );
    
    //caso especial body (body no conoce "scrollTop" "scrollLeft" ) 
    //document se le envia documentElement para recuperar body y se puedan consultar  scrollTop
    window.onscroll = (event) => { onScrollEvent(event,document.documentElement) };
  }


  function findScrollElements( domNode )
  {
    let domCollection = domNode.children;
    for ( let i=0;i < domCollection.length ;i++)
    {
      detectElemtsScroll(domNode, domCollection);
      findScrollElements( domCollection[i] );
    } //recursivo en todo el arbol de elementos
  }

  function detectElemtsScroll(container, listContents)
  { //revisa si alguno de los hijos contendio es mayor al contenedor
    let sumHeightContent=0;
    for ( let i=0;i < listContents.length ;i++)
    {
      if( isOverflowContent(container, listContents[i]) )
      { // console.log("event Scroll Insert");
        setScrollEvent(container);   
        return true;
      }else
      { //falta revisar la suma de todos los altos heigth supera el contenedor
        sumHeightContent = sumHeightContent + listContents[i].offsetHeight;
      }
    }

    if(sumHeightContent > container.offsetHeight )
    { //si la suma de alturas del contenido es mayor a la altura del contenedor
      setScrollEvent(container); 
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

  function setScrollEvent( containerDomNode )
  { // containerDomNode es el contenedor de scroll event
    containerDomNode.addEventListener("scroll",(event) => {
      onScrollEvent(event,containerDomNode);
    });
  }


  // evento principal que recolecta los datos del scroll
  function onScrollEvent(event,domNode)
  { //si el croll se mantiene en el mismo obj o se iso scroll en otro pbj
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
    //  , domScrollObj:"referencia al obj que realizo el scroll"
    //   arrayScrollPoints:[ {"pointX":0,"pointY":52},  .... ];
    // }  
  
  //arrayScrollPoints  es una colleccion de obj "ScrollPoints" que solo tiene dos atributos x,y

// envia la info del evento scroll
  function sendDataScrollEvent()
  { //info Consola
    console.log(">> Send scroll Event Info ");
    //console.log(domCurrentObj);
    //console.log( JSON.stringify(scrollEventInfo) );
    
    //referencia al obj que se realizo el evento
    scrollEventInfo.setDomScrollObj( createXPathFromElement( domCurrentObj ) );
    //envio de info a Pharo server
    makeRequest( JSON.stringify( scrollEventInfo ) );
     
    resetScrollDataInfo();
  }

  function resetScrollDataInfo()
  {
    scrollEventInfo = new ScrollEventInfo();
    domCurrentObj = null;
  }

  //>>>>>>>>>para enviar los datos a Pharo
  
/*   function logEventPharoScroll (jsonElements) {
    var http = new XMLHttpRequest ();
    var url = "http://localhost:1701/register";
  
    http.open("POST", url, true);
  
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
        //alert(http.responseText);
        }
    }
   http.send(jsonElements);
  }
 */
  // function logEventPharoScroll(scrollEventInfo)
  // { 
  //   const data = scrollEventInfo;

  //   fetch('http://localhost:1701/register', {
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

