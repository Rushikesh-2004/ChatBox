const express=require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js")
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use (express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));//to parse data 
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const  session = require('express-session')
const flash = require('connect-flash')
main().then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}

// let chat1= new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send me your classnotes plzz",
//     created_at:new Date()
// });
// chat1.save().then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err)
// });


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const sessionOptions =
 {
    secret:"jyfuyfhgvhgf",
    resave:false,
    saveUninitialized:true
};


app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  next();
})


 app.get ("/",(req,res)=>{
  res.send("Working on a port");
})




//index route
app.get ("/chats",async(req,res)=>{
  
   let chats =  await Chat.find();
   
  
   res.render("index.ejs",{chats})
   
   
   
   

})


//new route

app.get ("/chats/new",(req,res)=>{
  

  
   
  res.render("view.ejs");
  

})

//saving data in database route
app.post ("/chats",(req,res)=>{
  
  let {from,to,msg}=req.body;
  let newChat=new Chat ({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })
  newChat.save().then((res)=>{
    console.log("Chat Was Saved");
  }).catch(err=>{
    console.log(err);
  })
  req.flash("success","New chat was created successfully!")
  res.redirect('/chats')
});






//edit route
app.get ("/chats/:id/edit",async(req,res)=>{
  let {id}= req.params;
  let chat = await Chat.findById(id);
    
  res.render("edit.ejs",{chat});

  

})

//update route
// app.put ("/chats/:id",async(req,res)=>{
//   let {id}=req.params;
//   let {msg:newMsg}=req.body;
//   let updatedChat=await Chat.findByIdAndUpdate(id,
//     {msg:newMsg},
//     {runValidators:true,new:true}
//   );
//   console.log(updatedChat);
//   res.redirect("/chats");

// })


app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { msg: newMsg } = req.body;

  // Validate input
  if (!newMsg) {
    return res.status(400).send("Message content cannot be empty.");
  }

  try {
    // Find and update the chat by ID
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true, new: true }
    );

    if (!updatedChat) {
      return res.status(404).send("Chat not found.");
    }

    console.log(updatedChat); 
    req.flash("success","chat was updated successfully!")
    res.redirect("/chats");
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).send("Server error. Unable to update chat.");
  }
});


//Delete route
app.delete("/chats/:id",async (req,res)=>{
  let {id}=req.params;
 let chatToBeDeletd = await Chat.findByIdAndDelete(id);
 console.log(chatToBeDeletd);
 req.flash("success","chat was deleted successfully!")
 res.redirect("/chats");
 

});





















app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});