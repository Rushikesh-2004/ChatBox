// const mongoose = require('mongoose');
// const Chat = require("./models/chat.js");
// main().then(()=>{console.log("connection successful")})
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// allChats=[
//     {
//     from:"neha",
//     to:"pritee",
//     msg:"send me your notes for exam",
//     created_at:new Date(),
//     },
//     {
//         from:"rohit",
//         to:"mohit",
//         msg:"teach me js callbacks",
//         created_at:new Date(),
//         },

//         {
//             from:"amit",
//             to:"sumit",
//             msg:"all the best",
//             created_at:new Date(),
//             },

//             {
//                 from:"anita",
//                 to:"ramesh",
//                 msg:"bring me some fruits",
//                 created_at:new Date(),
//                 },
//                 {
//                     from:"tony",
//                     to:"peter",
//                     msg:"love you 3000",
//                     created_at:new Date(),
//                     }
                

// ];
// Chat.insertMany(allChats);