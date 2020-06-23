function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  document.getElementById("scrollTest").addEventListener("scroll",event => {
  
    var elmnt = document.getElementById("scrollTest");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;

    document.getElementById ("scrollX").innerHTML =  x + "px";
    document.getElementById ("scrollY").innerHTML =  y + "px";

  });   

