
// run websockify 8081 --unix-target=/tmp/ab & nc -vUl /tmp/ab to construct a server
var WebSocketStream = require("./websocketstream.js")
var ws = new WebSocketStream("ws://localhost:8081")
ws.onclose = function() { console.log("closed") }

ws.onopen = function() {

ws.send("\x05\x01\x00")
ws.recv(2).then(function(d) {
  // NOTE: WebSocketStream by default passes text
  //       I am unsure if . It is probably up to the websocket library.
  console.log("read these: ", d.charCodeAt(0), d.charCodeAt(1))
}).then(function() {
  ws.send("\x05\x01\x00\x03\x0Cuwaterloo.ca\x00\x50")
}).then(function() { return ws.recv(4) })
.then(function(d) {
    console.log("read these: ", d.charCodeAt(0), d.charCodeAt(1), d.charCodeAt(2), d.charCodeAt(3))
   ws.send("GET / HTTP/1.1\r\n\r\n")
}).then(function() {
  return ws.recv()
}).then(function(page) {
  console.log(page)
})


}
