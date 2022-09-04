const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/medicare",{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log("connected..!!!")
    else
        console.log("Error While connecting with the database")
})

const user= require('./user.model')