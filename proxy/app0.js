var express = require("express");
var app = express();
var proxy = require("http-proxy-middleware");//1

//2.
var options={
	target:"http://127.0.0.1:82",//目标主机
	changeOrigin: true
}
//3
var exampleProxy = proxy(options);//开启代理功能,并加载配置 

//4.
app.use("/addPost",exampleProxy)


var page="01.html";

app.get("/",function(req,res){
	res.sendFile(__dirname+"/"+page);
})

app.listen(81,function(){
	console.log("OK 81");
})
