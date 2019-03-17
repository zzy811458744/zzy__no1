var express  = require("express");
var bodyParser=require("body-parser");
var app = express();
//1.
var multer = require("multer");
var fs = require("fs");

//2.
app.use(multer({dest:"/tmp/"}).array("file"));
var postparse=bodyParser.urlencoded({extended:false});//1
//app.use(postparse);//2

var page="page/01.html";

app.get("/",function(req,res){
	res.sendFile(__dirname+"/"+page);
})

//上传文件
app.post("/upload",postparse,function(req,res){
	var obj=req.body;
	console.log("obj:",obj);
	console.log("req.files[0]:",req.files[0]);
	var myFile=req.files[0];
	var id=new Date().getTime()+"";
	var imgName=id+"_"+myFile.originalname;
	var desFile="./upload/"+imgName;
	console.log("desFile:",desFile);
	var path=myFile.path;
	fs.readFile(path,function(err,data){
		if(err){
			console.log("读取文件失败err:",err);
			res.send({error:1});
		}else{
			fs.writeFile(desFile,data,function(err){
				if(err){
					console.log("复制文件失败",err);
					res.send({error:2});
				}else{
					console.log("上传文件成功");
					var obj={
						msg:0,
						imgUrl:imgName
					}
					res.send(obj);
					console.log("fs.existsSync(path):",fs.existsSync(path));
					if(fs.existsSync(path)){
						fs.unlink(path,function(err){
							if(err){
								console.log("err:",err);
							}else{
								console.log("清除临时文件成功");
							}
						})						
					}
				}
			})
		}
	})
	
//	fs.copyFile(path,desFile,function(err){
//		if(err){
//			console.log("err:",err);
//		}else{
//			console.log("复制成功");
//			var obj={
//				msg:0,
//				img:imgName
//			}
//			res.send(obj);
//		}
//	})
})

app.listen(81,function(){
	console.log("OK 81");
})
