const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

app.use(express.json());

app.use(passport.initialize());
require("./passport")(passport);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH'); // methods allowed
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //authorization
    next();
})

mongoose.connect("mongodb://localhost/ProjectManager", { useNewUrlParser: true, useUnifiedTopology: true });

const db=mongoose.connection; 
db.on("error", (error)=> console.error(error));
db.once("open", ()=> console.log("Database connected.."));

const empRouter = require("./routing");

app.use("/", empRouter);

app.listen(3000,()=>{
    console.log("Server running...");
})