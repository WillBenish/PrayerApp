var exec = require("child_process").exec
var db = require("./db");
var path    = require("path");
var fs    = require("fs");

function start(response){
    console.log("Request handler 'start' was called");
    var content = "empty";
    
    exec("ls -lah",function(error,stdout,stderr){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
        });
return content;
}

function upload(response){
    console.log("request handler 'upload' was called");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("hello uplsad");
        response.end();
    
}
function static(response){
    console.log("request handler 'static' was called");
        var filePath ='/public/index.html';

filePath = __dirname+filePath;
var extname = path.extname(filePath);
var contentType = 'html';

switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    }

        fs.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                response.writeHead(500);
                response.end();
            }
            else {                   
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content);                  
            }
        });
    }
       // response.writeHead(200, {"Content-Type": "text/html"});
        //response.write(path.join(__dirname+'/index.html'));
        //response.sendFile(path.join(__dirname+'/index.html'))
        //response.end();
    
});
}
function data(response){
    console.log("Request handler 'data' was called");
   // db.listAll(response);
    db.getPrayers(response);

    var content = "empty";
    
    // exec("ls -lah",function(error,stdout,stderr){
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write(stdout);
    //     response.end();
    //     });
return content;
}
 
exports.start = start;
exports.upload = upload;
exports.data = data;
exports.static = static;
