const mongoose = require('mongoose');
const Property = require('../models/propertyModel');
const User = require('../models/userModel')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');


dotenv.config({path: './../config/config.env'})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // You can define your own path here for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer upload with the defined storage and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter,
}).array('images', 6);

exports.addProperty = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const {
      name,
      description,
      price,
      location,
      furnished,
      genderAllowed,
      occupancyType,
      phoneNumber,
      webUrl,
    } = req.body;
    console.log(webUrl, name, description, price, location, furnished, genderAllowed, occupancyType, phoneNumber)
    // Extract image URLs
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    try {
      const property = new Property({
        name,
        description,
        price,
        location,
        furnished,
        genderAllowed,
        occupancyType,
        images: imageUrls,  // Store the array of image URLs
        phoneNumber,
        webUrl
  
      });

      await property.save();
      res.status(201).json({
        success: true,
        message: 'Property added successfully',
        property,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding property',
        error: error.message,
      });
    }
  });
};

exports.getLandlordProperties = async (req, res) => {
    try {
      const landlordEmail = req.user.email; 
      const properties = await Property.find({ 'agent.email': landlordEmail });
  
      if (!properties) {
        return res.status(404).json({ 
          message: 'No properties found for this landlord' 
        });
      }
  
      res.status(200).json({ properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

  exports.getPropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;

      const baseURL = `${process.env.BASE_URL}`

      const property = await Property.findById(propertyId).lean();
  
      if (!property) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }

      const propertyWithFullImageURLs = {
        ...property,
        images: property.images.map(image => `${baseURL}${image}`), // Prepend baseURL to each image path
      };

      res.status(200).json(propertyWithFullImageURLs);

    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updatePropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const updates = req.body;
  
      const updatedProperty = await Property.findByIdAndUpdate(propertyId, updates, { new: true });
  
      if (!updatedProperty) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }
  
      res.status(200).json({ 
        property: updatedProperty 
      });
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

  exports.deletePropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
  
      if (!deletedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({ 
        message: 'Property deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };
