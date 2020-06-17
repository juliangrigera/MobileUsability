function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

window.addEventListener("scroll",event => {
  document.getElementById("scrollY").innerText = window.scrollY.toFixed(2);
  document.getElementById("scrollX").innerText = window.scrollX.toFixed(2);

  });   

