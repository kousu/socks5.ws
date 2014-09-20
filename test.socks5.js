
if(!WebSocket) {
  var WebSocket = require("ws");
}
var SOCKS5 = require("./socks5.js")


process.argv.shift() //this removes "/usr/bin/node" and should be a standard part of the startup; it is for python

var target = process.argv[1]
if(!target) {
  target = "uwaterloo.ca:80"
}

var prx = SOCKS5("ws://localhost:8081");
//prx = WebSocket // to demonstrate drop-in compatibility,
                  // uncomment this and pass "ws://localhost:8082" as the target
                  // while running `websockify 8082 real_target`
var ws = new prx(target)

// Note that from here onwards is the straight WebSockets API
ws.onopen = function() {
  console.log("Requesting HTTP from ", target)
  this.send("GET / HTTP/1.1\r\n\r\n")  
}

ws.onmessage = function(e) {
  console.log("Response:")
  console.log(e.data);
}

ws.onerror = function(e) {
  console.log("It blew up! "+"["+e.constructor.name+"]"+" follows:")
  console.log()
  console.log(e)
}


setTimeout(function() {
  console.log("Timeout.")
  ws.close();
}, 15*1000)