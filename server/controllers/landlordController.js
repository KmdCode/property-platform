const Property = require('../models/propertyModel');

exports.addProperty = async (req, res) => {
  const {
    name,
    description,
    price,
    location,
    furnished,
    genderAllowed,
    occupancyType,
    image,
  } = req.body;

  try {
    const property = new Property({
      name,
      description,
      price,
      location,
      furnished,
      genderAllowed,
      occupancyType,
      image,
      agent:{
        email:req.user.email
      } , 
    });

    await property.save();
    res.status(201).json({ 
        success: true, 
        message: 'Property added successfully', 
        property 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        message: 'Error adding property', 
        error: error.message });
  }
};

exports.getLandlordProperties = async (req, res) => {
    try {
      const landlordEmail = req.user.email; 
      const properties = await Property.find({ 'agent.email': landlordEmail });
  
      if (!properties) {
        return res.status(404).json({ 
          message: 'No properties found for this landlord' });
      }
  
      res.status(200).json({ properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getPropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({ property });
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
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({ property: updatedProperty });
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deletePropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
  
      if (!deletedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.addTenant = async (req, res) => {
  const { propertyId } = req.params; 
  const { name, email, phone, roomNumber, roomType } = req.body; 

  try {
    
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newTenant = {
      name,
      email,
      phone,
      roomNumber,
      roomType,
    };

    property.tenants.push(newTenant);

    await property.save();

    res.status(201).json({
      message: 'Tenant added successfully',
      tenant: newTenant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTenants = async (req, res) => {
  const { propertyId } = req.params; 

  try {

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const tenants = property.tenants;

    res.status(200).json({ tenants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteTenant = async (req, res) => {
  try {
    const { propertyId, tenantId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }


    const tenantIndex = property.tenants.findIndex(tenant => tenant._id.toString() === tenantId);
    if (tenantIndex === -1) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    property.tenants.splice(tenantIndex, 1);

    await property.save();

    res.status(200).json({ message: 'Tenant deleted successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};