const express= require('express');
const UserController = require('./controllers/user');
const collection=require('./models/index');
const application= express();
const cors= require('cors');

application.use(express.json());
application.use(cors());
application.use("/user/api",UserController);

application.listen(8080,()=>{
    console.log("Application started in port 8080")
})