
var SOCKS5 = require("./socks5.js")



process.argv.shift()//this removes "/usr/bin/node" and should be a standard part of the startup; it is for python


var target = process.argv[1]
if(!target) {
  target = "uwaterloo.ca:80"
}

// auth needs to be handled by some sort of callback..?
var prx = SOCKS5("ws://localhost:8081");

var ws = new prx(target)

// this part onwards is drop-in websockets compatible

ws.onopen = function() {
  console.log("Requesting HTTP from ", target)
  this.send("GET / HTTP/1.1\r\n\r\n")  
}

ws.onmessage = function(e) {
  console.log("Response:")
  console.log(e.data);
}

ws.onerror = function(e) {
  console.log("It blew up!")
  console.log(e)
}


setTimeout(function() {
  console.log("Timeout.")
  ws.close();
}, 15*1000)
/*
or proxy via 

var prx = new SOCKS5("ws://proxy-host.com:3535", "tor.kousu.ca:22")

and prx is simply 

// or with our (currently imaginary) SSH client library:
var ssh = new SSH(prx)
ssh.onconnect = function(e) {
  ssh.login("user", "pass")
}
ssh.onlogin = function(e*

*/
