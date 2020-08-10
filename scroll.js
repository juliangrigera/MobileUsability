
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
    constructor( initialPositionScroll = new ScrollPoints(0,0) )
    {
      this.timestamp = Date.now();
      this.arrayScrollPoints = new Array( initialPositionScroll );
    } 

    addScrollPoint(scrollPoint)
    {
      this.arrayScrollPoints.push(scrollPoint);
    }
  }


  var scrollTimerEventId;
  var resetValuePoint;
  //var arrayScrollPoints = new Array( new ScrollPoints(0,0) );
  var scrollEventInfo = new ScrollEventInfo();


  document.getElementById("scrollTest").addEventListener("scroll",event => {
  
    var elmnt = document.getElementById("scrollTest");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;

    document.getElementById ("scrollX").innerHTML =  x + "px";
    document.getElementById ("scrollY").innerHTML =  y + "px";

    // arrayScrollPoints.push(new ScrollPoints(x,y));
    resetValuePoint = new ScrollPoints(x,y);
    scrollEventInfo.addScrollPoint( new ScrollPoints(x,y) );

    setTimerScrollEvent();


    // para enviar los datos a Pharo
    logEventPharoScroll(JSON.stringify({class:'Scroll', timestamp: new Date().getTime(), x: x,
    y: y}));
  }); 
  
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

  function setTimerScrollEvent()
  { //carga el nuevo evento y resetea el timer
    clearTimeout(scrollTimerEventId);
   
    scrollTimerEventId = window.setTimeout( sendDataScrollEvent2, 1500 );
  }

  function sendDataScrollEvent2()
  {
    console.log(">>>>>>>>>>> scroll Event <<<<<<<<<<<");
    console.log( JSON.stringify(scrollEventInfo) );
    scrollEventInfo = new ScrollEventInfo(resetValuePoint);
  }

  function sendDataScrollEvent()
  { 
    const data = scrollEventInfo;
    //reset initial data 
    scrollEventInfo = new ScrollEventInfo(resetValuePoint);

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
 
  
