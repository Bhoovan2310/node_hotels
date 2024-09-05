const express = require('express');
const router = express.Router();

const MenuItem = require("./../models/menuItem");

router.post("/", async (req, res) => {
    try {
      const data = req.body; ;
      const newMenu = new MenuItem(data);
  
      const response = await newMenu.save();
      
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
          const data = await MenuItem.find();
          console.log('data fetched');
          res.status(200).json(data);
      }catch(err) {
          console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
      }
  });
  
  router.get('/:tasteType',async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
          const data = await MenuItem.find({taste : tasteType});
        console.log('data fetched');
        res.status(200).json(data);
        }else {
          res.status(404).json({error : 'Invalid taste type'} );
        }
    }catch(err) {
        console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
    }
  });



  router.put('/:id',async (req, res) => {
    try {
      const menuItemId = req.params.id;
      const updatedMenuItemData = req.body;
      const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
        new : true,
        runValidators : true,
      });

      if(!response) {
        return res.status(404).json('Menu Item not found')
      }
      console.log('menu Item data updated');
      res.status(200).json(response);
    }
    catch(err) {
      res.status(500).json({error : 'Internal Server Error'});
    }
})

router.delete('/:id',async (req, res) => {
    try {
      const menuItemId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuItemId);

      if(!response) {
        return res.status(404).json('Menu Item not found')
      }
      console.log('menu Item data deleted');
      res.status(200).json(response);
    }
    catch(err) {
      res.status(500).json({error : 'Internal Server Error'});
    }
})


  module.exports = router;