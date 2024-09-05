const express = require('express');

const router = express.Router();
const Person = require("../models/person");



router.post("/", async (req, res) => {
    try {
      const data = req.body; // Assuming the request body contains the person data
      // const newPerson = new Person();
      // newPerson.name = data.name;
      // newPerson.age = data.age;
      // newPerson.work = data.work;
      // newPerson.mobile = data.mobile;
      // newPerson.email = data.email;
      // newPerson.salary = data.salary;
      // newPerson.address = data.address;
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
  
      //Save the new Person to the database
      const response = await newPerson.save();
      
      console.log('data saved');
      res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
    }
  });
  
  //Get method to get 
  router.get('/',async (req, res) => {
      try {
          const data = await Person.find();
          console.log('data fetched');
          res.status(200).json(data);
      }catch(err) {
          console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
      }
  });
  
  router.get('/:workType',async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
          const response = await Person.find({work : workType});
          console.log('data fetched');
           res.status(200).json(response);
        }else {
          res.status(404).json({error : 'Invalid work type'});
        }
    }catch(err) {
        console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
    }
  });


  
  router.put('/:id',async (req, res) => {
      try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new : true,
          runValidators : true,
        });

        if(!response) {
          return res.status(404).json('Person not found')
        }
        console.log('person data updated');
        res.status(200).json(response);
      }
      catch(err) {
        res.status(500).json({error : 'Internal Server Error'});
      }
  })


  router.delete('/:id',async (req, res) => {
      try {
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(personId);

        if(!response) {
          return res.status(404).json('Person not found')
        }
        console.log('person data deleted');
        res.status(200).json({message : 'Person deleted successfully'});
      }
      catch(err) {
        res.status(500).json({error : 'Internal Server Error'});
      }
  })
  module.exports = router;