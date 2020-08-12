
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
      this.timestamp = Date.now();
      this.arrayScrollPoints = new Array( );
    } 

    addScrollPoint(scrollPoint)
    {
      this.arrayScrollPoints.push(scrollPoint);
    }
  }




  // id del Proceso temporizado para enviar los datos despues del evento scroll
  var scrollTimerEventId;
  //Datos de los puntos x,y del desplazamiento del scroll a enviar
  var scrollEventInfo = new ScrollEventInfo();

  scrollEventInitialize();




  function scrollEventInitialize()
  {
    console.log(">>>> Escroll Event ");
    
    //itera sobre todo el arbol de elementos de body buscando candidatos para el eventScroll 
    findScrollElements( document.body );
   
    //agregar document pricipal
    // console.log(document.children);
    // var as = document.children;
    // console.log(as[0]);
    //setScrollEvent( as[0] );
  }

  function findScrollElements( domNode )
  {
    let domCollection = domNode.children;
    for ( let i=0;i < domCollection.length ;i++)
    {
      detectElemtsScroll2(domNode, domCollection);
      findScrollElements( domCollection[i] );
    }
  }

  function detectElemtsScroll2(container, listContents)
  { //revisa si alguno de los hijos contendio es mayor al contenedor
    for ( let i=0;i < listContents.length ;i++)
    {
      if( isOverflowContent(container, listContents[i]) )
      {
        console.log("event Scroll Insert");
        console.log(container);
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
      
      var x = domNode.scrollLeft;
      var y = domNode.scrollTop;

      scrollEventInfo.addScrollPoint( new ScrollPoints(x,y) );
      setTimerScrollEvent();

    });
  }


  function setTimerScrollEvent()
  { //carga el nuevo evento y resetea el timer
    clearTimeout(scrollTimerEventId);
   
    scrollTimerEventId = window.setTimeout( sendDataScrollEvent2, 1500 );
  }

  function sendDataScrollEvent2()
  {
    console.log(">>>>>>>>>>> scroll Event <<<<<<<<<<<");
    console.log( JSON.stringify(scrollEventInfo) );
    scrollEventInfo = new ScrollEventInfo();
  }

  function sendDataScrollEvent()
  { 
    const data = scrollEventInfo;
    //reset initial data 
    scrollEventInfo = new ScrollEventInfo();

    fetch('http://localhost:8000/ejemplo.php', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })                        //change recive json - text
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
     })
     .catch((error) => {
       console.error('Error:', error);
     });

  }
