const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  location: String,
  furnished: {
    type: Boolean,
    default: false,
  },
  genderAllowed: {
    type: String,
    enum: ['female', 'male', 'any'],
    default: 'any',
  },
  occupancyType: {
    type: String,
    enum: ['single', 'sharing'],
    default: 'single',
  },
  agent: {
    email: {
      type: String,
      required: true,
    },
    phoneNum:{
      type: Number,
      required: true,
    }
  },
  images: {
    type: [String],  
    validate: {
      validator: function(array) {
        return array.length <= 6; 
      },
      message: 'You can only upload up to 6 images.'
    }
  },
  webUrl:{
    type: String,
    required: true,
  },
  phoneNumber:{
    type: Number,
    required: true,

  }

});

module.exports = mongoose.model('Property', propertySchema);
