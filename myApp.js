var express = require('express');
var app = express();
require('dotenv').config();
var bodyParser = require('body-parser');


// --> 7)  Mount the Logger middleware here	

app.use(function(req, res, next)
{
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});


// --> 11)  Mount the body-parser middleware  here	


app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */	

console.log("Hello World");


/** 2) A first working Express Server */	

// app.get("/", function(req, res){
//     res.send("Hello Express");
// });


/** 3) Serve an HTML file */	

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});


/** 4) Serve static assets  */	
app.use(express.static(__dirname + "/public"));


/** 5) serve JSON on a specific route */	

// app.get("/json",function(req, res){
//     res.json({"message": "Hello json"});
// });


/** 6) Use the .env file to configure the app */	
app.get("/json",function(req, res){
   if(process.env.MESSAGE_STYLE === "uppercase")
   {
    res.json({"message": "HELLO JSON"});
   }else
  {
    res.json({"message": "Hello json"});

   }
});

/** 7) Root-level Middleware - A logger */	
//  place it before all the routes !	




/** 8) Chaining middleware. A Time server */	

app.get('/now', function(req, res, next)
{
    req.time = new Date().toString();
    next();
},function(req,res)
{
res.json({"time" : req.time});
});


/** 9)  Get input from client - Route parameters */	
app.get("/:word/echo",function(req,res)
{
    res.json({"echo": req.params.word});
});



/** 10) Get input from client - Query parameters */	
// /name?first=<firstname>&last=<lastname>	
// app.route(path).get(handler).post(handler) This syntax allows you to chain different verb handlers on the same path route. 
app.get("/name",function(req,res)
{
    res.json({"name": req.query.first + " " + req.query.last});
});


/** 11) Get ready for POST Requests - the `body-parser` */	
// place it before all the routes !	

// Install the body-parser module in your package.json. 
// Then, require it at the top of the file.
// Store it in a variable named bodyParser.
// The middleware to handle urlencoded data is returned by
// bodyParser.urlencoded({extended: false}).
// Pass to app.use() the function returned by the previous method call.
// As usual, the middleware must be mounted before all the routes which need it.

// Note: extended=false is a configuration option that tells the parser to use the classic encoding.
// When using it, values can be only strings or arrays. 
// The extended version allows more data flexibility, but it is outmatched by JSON.






/** 12) Get data form POST  */	


app.post("/name",function(req,res)
{
    res.json({"name": req.body.first + " " + req.body.last});
});



// This would be part of the basic setup of an Express app	
// but to allow FCC to run tests, the server is already active	
/** app.listen(process.env.PORT || 3000 ); */	


//---------- DO NOT EDIT BELOW THIS LINE --------------------

































 module.exports = app;
