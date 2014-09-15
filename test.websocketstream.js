
// run websockify 8081 --unix-target=/tmp/ab & nc -vUl /tmp/ab to construct a server
var WebSocketStream = require("./websocketstream.js")
var ws = new WebSocketStream("ws://localhost:8081")
ws.onclose = function() { console.log("closed") }

ws.recv(6).then(function(d) {
  // NOTE: WebSocketStream by default passes text
  //       I am unsure if . It is probably up to the websocket library.
  console.log("read these 6 characters: ", d)
})
