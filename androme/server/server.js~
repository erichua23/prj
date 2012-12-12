#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
        self.port      = process.env.OPENSHIFT_INTERNAL_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        // Routes for /health, /asciimo and /
        self.routes['/health'] = function(req, res) {
            res.send('1');
        };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();


// slightly modified version of echo-server.js for the web-sockets demo
var sys = require("util")
  , fs = require("fs")
  , path = require("path")
  , http = require("http")
  , ws = require(__dirname + '/VanCoding-node-websocket-server-7ddbb34');
/*-----------------------------------------------
  logging:
-----------------------------------------------*/
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}
function timestamp() {
  var d = new Date();
  return [
    d.getDate(),
    months[d.getMonth()],
    [ pad(d.getHours())
    , pad(d.getMinutes())
    , pad(d.getSeconds())
    , (d.getTime() + "").substr( - 4, 4)
    ].join(':')
  ].join(' ');
};
function log(msg) {
  sys.puts(timestamp() + ' - ' + msg.toString());
};
function serveFile(req, res){
  if( req.url.indexOf("favicon") > -1 ){
    log("HTTP: inbound request, served nothing, (favicon)");
    
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end("");
  } else {
    log("HTTP: inbound request, served client.html");
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream( path.normalize(path.join(__dirname, "client.html")), {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener("data", function(chunk){
      res.write(chunk, 'binary');
    }).addListener("close",function() {
      res.end();
    });
  }
};
/*-----------------------------------------------
  Spin up our server:
-----------------------------------------------*/
var httpServer = http.createServer(serveFile);
var connected = 0;
var server = ws.createServer({
  debug: true
}, httpServer);
server.addListener("listening", function(){
  log("Listening for connections on " + 8888);
});
// Handle WebSocket Requests
server.addListener("connection", function(conn){
  log("opened connection: "+conn.id);
  
  connected++;
  server.send(conn.id, '欢迎加入firechat');
  conn.broadcast(connected+'加入了firechat');
  
  conn.addListener("message", function(message){
    log("<"+conn.id+"> "+message);
    conn.broadcast(message);
  });
});
server.addListener("close", function(conn){
  log("closed connection: "+conn.id);
  connected--;
  conn.broadcast(connected+'');
});
server.listen(8888);
// Handle HTTP Requests:
// This will hijack the http server, if the httpserver doesn't 
// already respond to http.Server#request
server.addListener("request", serveFile);

