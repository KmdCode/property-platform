const express = require('express');
const { addProperty, 
        getLandlordProperties, 
        updatePropertyById, 
        deletePropertyById, 
        getPropertyById,
    } = require('./../controllers/landlordController');
const { authMiddleware } = require('./../middleware/authMiddleware'); 

const router = express.Router()

router.route('/addProperty').post(authMiddleware, addProperty)
router.route('/properties').get(authMiddleware, getLandlordProperties)
router.route('/properties/:propertyId').get(authMiddleware, getPropertyById)
router.route('/properties/:propertyId').put(authMiddleware, updatePropertyById)
router.route('/properties/:propertyId').delete(authMiddleware, deletePropertyById)

module.exports = router;