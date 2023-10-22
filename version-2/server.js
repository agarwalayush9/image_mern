const express = require("express");
const app= express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
const port = process.env.PORT || 5001;
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 
const url= process.env.REACT_APP_API;
mongoose.connect(url,{
  useNewUrlParser:true,
}).then(()=>{
  console.log("Connected to Mongo db");
}).catch((e)=>console.log(e));

require("./imgSchema");
const Img = mongoose.model("ImgGallery");
app.listen(port,()=>{
    console.log("Server is running");
})
app.post("/uploadImg",async(req,res)=>{
    const {base64}= req.body;
    try{
       await Img.create({image:base64});
        res.send({Status:"ok"})
    }
    catch(error){
        res.send({Status:"error",data:error});
    }
});
app.get("/get-img",async(req,res)=>{
    try{
       await Img.find({}).then(data=>{
        res.send({Status:"ok",data:data})
       })
    }
    catch(error){
        res.send({Status:"error",data:error});   
    }
});