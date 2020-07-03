 
  var scrollTimerEventId;
  var scrollPoints;

  class ScrollPoints
  {  
    constructor(pointX, pointY)
    {
      this.pointX=pointX;
      this.pointY=pointY;
      //time  
    }
  }

  document.getElementById("scrollTest").addEventListener("scroll",event => {
  
    var elmnt = document.getElementById("scrollTest");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;

    document.getElementById ("scrollX").innerHTML =  x + "px";
    document.getElementById ("scrollY").innerHTML =  y + "px";

    scrollPoints = new ScrollPoints(x,y);

    setTimerScrollEvent();

  });   

  function setTimerScrollEvent()
  { //carga el nuevo evento y resetea el timer
    clearTimeout(scrollTimerEventId);
    scrollTimerEventId = window.setTimeout( sendDataScrollEvent2, 1500 );
  }

  function sendDataScrollEvent2()
  {
    console.log(">>>>>>>>>>> scroll Event <<<<<<<<<<<");
    console.log("el objeto enviado es: ");
    console.log( JSON.stringify(scrollPoints) );
  }

  function sendDataScrollEvent()
  { 
    const data = scrollPoints;

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
 
  
