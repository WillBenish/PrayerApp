var MongoClient = require('mongodb').MongoClient;
 var mongoose = require('mongoose');

mongoose.connect('mongodb://test123:test123@ds059644.mlab.com:59644/pray');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED!!! (to Mongo Database)');// we're connected!
 
});


db.on('disconnected', function(err){
    console.log('not connected, waiting')
});
/*
function prayerText(documents){
    var textList = ''
    for(var i=0;i<documents.length;i++){
        textList = documents[i].prayer+'|'+textList;
    }
    //return textList;
    return JSON.stringify(documents);
}


function addPrayer(prayerText){
   var test = new Prayer({name: prayerText});
   test.save(function (err) {
  if (err) return console.error(err);
    });
  

};

function getPrayers(response){
       Prayer.find(function (err, tester) {
  if (err) return console.error(err);
  console.log(tester);
             response.writeHead(200, {"Content-Type": "text/plain"});
     //response.write(documents);
     response.write(JSON.stringify(tester));
    response.end();
           
       });
}
*/
//addPrayer('test text');

var myCollection;
var db;

function createConnection(){
 
    MongoClient.connect('mongodb://test123:test123@ds059644.mlab.com:59644/pray', function(err, db) {
        if(err)
            throw err;
        console.log("connected to the prayer database mongoDB !");
        myCollection = db.collection('Will');
 

    });
}


'use strict';
function listAll(response){
 var MongoClient = require('mongodb').MongoClient;

 MongoClient.connect(
 'mongodb://test123:test123@ds059644.mlab.com:59644/pray',
 function(err, connection) {
 var collection = connection.collection('Will');
 //collection.update({}, {'$set': {'age': 24}}, function(err, count) {


 collection.find().toArray(function(err, documents) {
 console.dir(documents);
 connection.close();
     response.writeHead(200, {"Content-Type": "text/plain"});
     //response.write(documents);
     response.write(prayerText(documents));
    response.end();
 });

 //});

 });

}

exports.listAll = listAll;
/*
exports.addPrayer = addPrayer;
exports.getPrayers = getPrayers;
module.exports = Prayer;
*/

 /*
function listAll(response){


    MongoClient.connect('mongodb://test123:test123@ds059644.mlab.com:59644/pray', function(err, db) {
        if(err)
            throw err;
         myCollection = db.collection('Will');  
            myCollection.find().toArray(function(err, documents) {
             console.dir(documents);
             
            });
    });
};
*/
    /*
            db.close();
        console.log("connected to the prayer database mongoDB !");
        myCollection = db.collection('Will');
            var cursor = myCollection.find({});
    var prayerlist = 'testr'; 
    console.log(myCollection.length);
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;
        fullList.push(doc.prayer);
        console.log(doc.prayer);
        console.log(fullList.length);
        prayerlist = prayerlist + 'test';
//console.log(prayerlist);
        //console.log(doc.company.employed);
    });
console.log(prayerlist);
console.log("hello");
    for(var i=0;i<fullList.length;i++){

        console.log(i);
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
     response.write(prayerlist);     
     response.end();
    });

}


     
        //listAll();



/*
function removeDocument(onRemove){
    myCollection.findAndModify({name: "doduck"}, [], {remove:true}, function(err, object) {
        if(err)
            throw err;
        console.log("document deleted");
        onRemove();
    });
}
 
function findDocument(onFinded){
    var cursor = myCollection.find({"name" : "doduck", "company.officialName" : "doduck LTD" });
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if(doc==null)
            return;
 
        console.log("document find:");
        console.log(doc.name);
        console.log(doc.company.employed);
        onFinded();
    });
}
 
function fieldComplexeUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {$set: {company: {employed: 10, officialName: "doduck LTD", industries: ["it consulting", "passionate programming"]}}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function fieldUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {$set: {industry: "France"}}, {w:1}, function(err) {
        if(err)
            throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function simpleUpdateDocument(onUpdate){
    myCollection.update({name: "doduck"}, {name: "doduck", description: "prototype your idea"}, {w:1}, function(err) {
    if(err)
        throw err;
        console.log('entry updated');
        onUpdate();
    });
}
 
function addDocument(onAdded){
    myCollection.insert({name: "doduck", description: "learn more than everyone"}, function(err, result) {
        if(err)
            throw err;
 
        console.log("entry saved");
        onAdded();
    });
}
 
function createConnection(onCreate){
 
    MongoClient.connect('mongodb://test123:test123@ds059644.mlab.com:59644/pray', function(err, db) {
        if(err)
            throw err;
        console.log("connected to the mongoDB !");
        myCollection = db.collection('test_collection');
 
        onCreate();
    });
}
// createConnection(function(){listAll());
 createConnection(function(){
    addDocument(function(){ 
        listAll();
    console.log('test');
        
    });
});
createConnection(function(){
    addDocument(function(){
        simpleUpdateDocument(function(){
            fieldUpdateDocument(function(){
                fieldComplexeUpdateDocument(function(){
                    findDocument(function(){
                        removeDocument(function(){
                            console.log("The end");
                        });
                    });
                });
            });
        });
    });
});
*/
