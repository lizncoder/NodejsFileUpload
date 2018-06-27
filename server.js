const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fileObj = multer({dest:"./www/upload"});
const server = express();

server.use(fileObj.any());
server.post("/upload",(req,res)=>{
	console.log(req.files[0]);
	var pathObj = req.files[0]
	var newName = req.files[0].path + path.parse(pathObj.originalname).ext;
	fs.rename(pathObj.path,newName,(err,data)=>{
		if(err){
			res.send({status:0,tips:"上传失败，请重试!"}).end()
		}else{
			res.send({status:1,tips:"上传成功!"}).end()
		}
	})
});

server.use(express.static('./views'));
server.listen(8081)
