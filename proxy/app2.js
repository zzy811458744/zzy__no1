var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded({extended:false})

app.get("/",function(req,res){
	res.send("这是82的主页");
});

app.post("/addPost",urlencodeParser,function(req,res){
	var obj=req.body;
	console.log("82 obj:",obj);
	res.send({msg:0,info:"82"});
})

app.listen(82,function(){
	console.log("OK 82");
})

