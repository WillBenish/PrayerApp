var server = require("./server");
var router = require("./router");
var fs = require("fs");
var path = require("path");
var db = require("./db");
var requestHandlers = require("./requestHandlers");



var handle = {};
handle['/'] = requestHandlers.start
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/data"] = requestHandlers.data;
handle["/static"] = requestHandlers.static;

