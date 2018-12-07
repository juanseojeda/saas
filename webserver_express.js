// Webserver example  using express
var express=require("express");
var app=express();

app.get("/",(req,res)=> {
    res.send("Hello World! ");
});
app.listen(process.env.PORT);
console.log("webserver listening ...");

