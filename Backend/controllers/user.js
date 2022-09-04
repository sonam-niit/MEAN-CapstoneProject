const express = require('express');
const mongoose = require('mongoose');
var User = require('../models/user.model')
const UserModel = mongoose.model("User");

const router = express.Router();

router.get("/", (req, res) => {
    UserModel.find((err, data) => {
        if (!err) {
            res.status(200).send(data);
        }
        else {
            res.status(404).send({ message: "No Data found" });
        }
    })
})
router.post("/",(req,res)=>{
    var user= new UserModel();
    user.fname= req.body.fname;
    user.lname= req.body.lname;
    user.email= req.body.email;
    user.password= req.body.password;
    user.save((err,doc)=>{
        if(!err)
            res.status(200).send(doc);
        else
            console.log(err)
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id,(err,doc)=>{
        if(!err){
            if(doc)
                res.status(200).send(doc);
            else
                res.status(404).send({ message: "Not found User with id " + id });
        }
        else{
            res.status(500).send({ message: "Error retrieving User with id=" + id });
        }
    })
});
// Update a user with id
router.put('/:id', (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  });
// Delete a user with id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndRemove(id,(err,doc)=>{
        if(!err)
        {
            if (!doc)
                res.status(404).send({message: `Cannot delete User with id=${id}. Maybe User was not found!`})
            else
                res.send({ message: "User was deleted successfully!"});
        }
       else
        res.status(500).send({message: "Could not delete User with id=" + id});
  });

});

module.exports = router;