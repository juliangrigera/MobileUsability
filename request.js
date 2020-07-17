var http = new XMLHttpRequest ();
var url = "http://localhost:1701/register";
/*var email = document.getElementById('email');
var password = document.getElementById('pass');"*/

http.open("POST", url, true);


http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) { 
       //aqui obtienes la respuesta de tu peticion
       alert(http.responseText);
    }
}
http.send(JSON.stringify({email:"email@miemail.com"}));