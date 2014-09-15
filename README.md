SOCKS5 in WebSockets
====================


SOCKS5 is a dead simple little protocol that makes very thin TCP and UDP proxies.
SOCKS is notable because it allows the client to decide where to proxy to.

This code implements SOCKS5 on top of WebSockets. If you point [websockify](https://github.com/kanaka/websockify/) at a SOCKS proxy, you will be able to proxy from your web browser to anywhere in the world.




Demo
----


Run a SOCKS server. The quickest is:
```
$ ssh -D 7777 localhost
```

Run websockify in front of that SOCKS server
```
$ websockify 8081 localhost:7777
```

Run the socks5.js client:
```
$ node test.socks5.js google.com:80
```

You probably need to `npm install ws` and `npm install ayepromise` first.

This gets more interesting if instead of sshing in the first step to localhost, you ssh somewhere you have a shell account.
Then the demo script will appear to google (or whoever you hit) to be coming from the system you have a shell account on.

The same library also works in your browser!

API
---

The API is based heavily on Promises/A+, which allows writing async code in a nearly-synchronous way.

```
var prx = new SOCKS5("ws://my-socks-proxy:1080", "bbs-site.com:666")
prx.onopen = function() {
  prx.send("Hello!")
  prx.read(20).then(function(data) {
    //...
  }).then(function() { return prx.read(21) }) //It is important to wrap future reads in
                                              // thunks so that reads are ordered properly.
  .then(function(data) {                      //When the promise of prx.read() resolves,
                                              // its value ends up in 'data'.
    //...
  })
}
```



SOCKS software
--------------

Servers:

* [ssh](http://www.openssh.com/) has a `-D` switch which makes your local machine into a SOCKS proxy,
        tunneling through to the other end of your ssh session. By default it only allows connections from
        localhost which is reasonably secure for short term use like getting around a school firewall.
* [dante](http://www.inet.no/dante/) is a little more fully featured SOCKS system with whitelisting and bandwidth throttling.
* [tor](http://torproject.org) relies crucially on SOCKS to move your traffic--including your DNS traffic--off your computer and into the TOR mixnet.

Clients:

* Most browsers support SOCKS5. Look under Network Settings in Firefox.
* [tsocks](http://tsocks.sourceforge.net/) which was forked to [torsocks](https://code.google.com/p/torsocks/) which wraps any Unix program through a SOCKS proxy.
