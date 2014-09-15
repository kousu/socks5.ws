
var SOCKS5 = require("./socks5.js")



process.argv.shift()//this removes "/usr/bin/node" and should be a standard part of the startup; it is for python


var target = process.argv[1]
if(!target) {
  target = "uwaterloo.ca:80"
}

var prx = new SOCKS5("ws://localhost:8081", target)

prx.onopen = function() {
  console.log("Requesting HTTP from ", target)
  prx.send("GET / HTTP/1.1\r\n\r\n")
  
  prx.recv().then(function(e) {
    console.log("Response:")
    console.log(e);
  })
}

prx.onerror = function(e) {
  console.log("It blew up!")
  console.log(e)
}


setTimeout(function() {
  console.log("timeout")
  prx.close();
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
