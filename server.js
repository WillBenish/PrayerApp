
var express = require('express');
 var app = express();
 var fs = require('fs');
 var http = require('http')
 var url = require('url');
 var bodyParser = require('body-parser');
var db = require("./db");
var Prayer = require('./prayer');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var path = require('path');

/*
 passport.use(new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: "http://www.example.com/auth/google/callback"
		},  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
))
*/
     app.get('/google87a5826e53f99ab7.html', function(req, res) {
        res.sendfile('./public/google87a5826e53f99ab7.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	app.get('/', function(req, res) {
			res.sendfile(path.join(__dirname, 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
		});
	

    app.use(express.static('public'));
	
	

		
	 app.get('/login', function(req, res) {
			res.sendfile('./public/login.html'); // load the single view file (angular will handle the page changes on the front-end)
		});
		
		
	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/static',
									   failureRedirect: '/login',
									   failureFlash: true })
		);
   

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.use(function(req,res, next){
    console.log('API IS HAPPENING!!');
    next();
})

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

function justDays(inputDate){
    return Math.floor(inputDate / 8640);
}

//All Prayers
router.route('/prayers')
    //Create Prayer
	.post(function(req,res){
       
        
        var today = new Date();
        var prayer = new Prayer();
        prayer.name =req.body.name;
        prayer.lastRun = justDays(today);//req.body.date;
        prayer.frequency = req.body.frequency;
        prayer.totalUpdates = 0;
        prayer.description = '';
        prayer.save(function(err) {
            if (err)
                res.send(err);
            
            res.json({message: "Prayer Created!"});
        });
    })
    
	//Get List of all prayers
    .get(function(req, res){
        Prayer.find().sort('lastRun').exec(function(err,prayers){
            if (err)
                res.send(err);
            
            res.json(prayers)               
        })
 
    });


//Prayer-Specific API
router.route('/prayers/:prayer_id')
    //get details on specific prayer
    .get(function(req,res){
        
        Prayer.findById(req.params.prayer_id,function(err,prayer){
            if(err)
                res.send(err);
            res.json(prayer);
            
        });
    })
    
	//Update Specific Prayer
    .put(function(req,res){
    var incomingPrayer = JSON.parse(req.params.prayer_id);

        Prayer.findById(incomingPrayer._id,function(err,prayer){
            if(err)
                res.send(err);
        var today = new Date();
        console.log(prayer);
        if(prayer.totalUpdates===null){
            prayer.totalUpdates=0;
        }
        prayer.name = prayer.name;//req.body.name;
        prayer.totalUpdates = prayer.totalUpdates +1;
        prayer.lastRun = justDays(today);//req.body.date;
       // prayer.frequency = req.body.frequency;
            
            prayer.save(function(err){
                if(err)
                    res.send(err);
                    
                res.json({message: 'Prayer Updated!'});
                
                    
                
            })
        })
    })
	//Delete Prayer
    .delete(function(req,res){
        Prayer.remove({
            _id: req.params.prayer_id
        }, function(err,prayer){
            if(err)
                res.send(err);
                
            res.json({message: 'Sucessfully deleted'});
            
        });
        })




/*
 var port = process.env.PORT || 3000;
 require('./routes')(app);
 
 function start(route, handle) {
 function onRequest(request,response){
     var pathname = url.parse(request.url).pathname;
     console.log('Request for '+ pathname+' received');
     

    
     route(handle,pathname,response);

    }
    
http.createServer(onRequest).listen(process.env.PORT, process.env.IP);

console.log("Server has started.");
}

*/

//exports.start = start;

//.Server(app);
// var path = require('path');

// var async = require('async');
// var io = require('socket.io').listen(http);


// var MongoClient = require('mongodb').MongoClient;
 
// var myCollection;
// var db;



//  app.get('/', function(req, res) {
//      res.sendFile(path.join(__dirname,'index.html'));
     
//  });




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

function addPrayer(newPrayer){
    myCollection.insert({name: newPrayer, description: "learn more than everyone"}, function(err, result) {
        if(err)
            throw err;
 
        console.log("entry saved");
        
    });
};
*/
//var databaseUrl = "mongodb://test123:test123@ds059644.mlab.com:59644/pray"; // "username:password@example.com/mydb" mongodb://<dbuser>:<dbpassword>@ds059644.mlab.com:59644/pray
//var collections = ["Will"];
//var mongojs = require("mongojs");
//var db = mongojs("dbname");
//var db = require('mongojs').connect(databaseUrl, collections);
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//


