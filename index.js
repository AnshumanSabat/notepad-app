const express = require('express');
const app =  express();
const path= require('path');
require("dotenv").config();

const usermodel = require('./models/usermodel');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // basically ye public folder se saari files isme link krta h vro
    app.post('/create', async function(req,res){
    let {title,details} = req.body;
    if (!title.trim() || !details.trim()) {
        return res.render("empty");
    }
     
    let createduser = await usermodel.create({
        title:title,
        details:details,
         userId: "demoUser1", 
    });
     res.redirect("/");
    }) ;                 
    app.post('/edit/:id',async function(req,res){
      let {title,details} = req.body;
    let upuser =  await usermodel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: "demoUser1"
    },
    { title, details }
  );
     res.redirect("/");});
    
app.get("/pin/:id", async function(req, res) {

  const note = await usermodel.findOne({
    _id: req.params.id,
    userId: "demoUser1"
  });

  if (!note) return res.redirect("/");

  await usermodel.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: "demoUser1"
    },
    {
      pinned: !note.pinned
    }
  );

  res.redirect("/");
});
   app.get("/empty",function(req,res){
         res.render("empty");
   });

   
  

    
app.get("/", async function (req,res){
  const notes = await usermodel.find({ userId: "demoUser1" }).sort({ pinned: -1 });
    res.render("index",{notes});
    
});
app.get("/edit/:id", async function(req,res){

  const note = await usermodel.findOne({
    _id: req.params.id,
    userId: "demoUser1"
  });

  if (!note) return res.redirect("/");

  res.render("edit", { note });
});
    

app.get("/delete/:id", async function (req,res){
  const notes =  await usermodel.findOneAndDelete({
    _id: req.params.id,
    userId: "demoUser1"
  });
    res.redirect("/");
    
});
app.get("/show/:id", async function(req,res){

  const notes = await usermodel.findOne({
    _id: req.params.id,
    userId: "demoUser1"
  });

  res.render("show", { notes });
});
    

app.get("/home", async function(req,res){
  res.render("home");
})
app.listen(process.env.PORT || 4000);
