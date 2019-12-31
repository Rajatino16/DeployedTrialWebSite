var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo");

var fSchema = new mongoose.Schema(
				{
					name : String
				});

var friends = mongoose.model("friend",fSchema);

// friends.create({
// 	name : "rajatino"
// },function(err,friends){
// 	if(err){
// 		console.log(err);
// 	}
// 	else
// 		{console.log(friends);}
// } );

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
   res.render("home"); 
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
	var addition = { name : newFriend }
    friends.create(addition, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to friends page
            res.redirect("/friends");
        }
    });
});	


app.get("/friends", function(req, res){
	friends.find({}, function(err, friend){
       if(err){
           console.log(err);
       } else {
          res.render("friends", {friends: friend});
       }
    });
});	

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!!!"); 
});


// USE ABOVE METHOD OR THIS METHOD IN GOORM IDE
// app.listen(3000, function() { 
//   console.log('Server listening on port 3000'); 
// });    use "PORT=3000 node app.js" to run the code 