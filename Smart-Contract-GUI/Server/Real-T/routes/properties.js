const router = require('express').Router();
const propertyModel = require('../models/properties');
const userModel = require('../models/users');
const authenticated = require('../middleware/authorization').authenticated();
const multer = require('../middleware/multer');
const axios = require('axios');

// Don't forget to create the images folder first

// Add a new property
// Get all properties
router.get('/', async (req, res, next) => {
    try {
        const properties = await propertyModel.find({});
        res.send(properties);
    } catch (err) {
        next("Internal server error: Couldn't get available properties");
    }
});

// Get all properties for a user
router.get('/tenant/:id', async (req, res, next) => {
    try {
        const properties = await propertyModel.find({tenant: req.params.id});
        res.send(properties);
    } catch (err) {
        next("Internal server error: Couldn't get properties for this user");
    }
});

// Get all properties for a user by username
router.get('/personal/:username', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ username: req.params.username.toLowerCase() });
        if (user){
            const properties = await propertyModel.find({available: true, owner: user._id}).populate({ path: "owner", model: userModel, select: {"password": 0}}).sort({"_id": -1});
            res.send(properties);
        } else {
            res.sendStatus(402);
        }
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get properties for this user");
    }
});


// Get a specific property
router.get('/:id', async (req, res, next) => {
    try {
        const property = await propertyModel.findOne({_id: req.params.id}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        res.send(property);
    } catch (err) {
        next("Internal server error: Couldn't get property");
    }
});

// Update a property
router.patch('/:id', authenticated, multer.upload.single('image'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    if (req.file) req.body.image = url + '/real-t/public/images/' + req.file.filename;
    try {
        const property = await propertyModel.findOneAndUpdate({_id: req.params.id, owner: req.user}, { $set: req.body }, { new: true, runValidators: true })
        if (!property) next("property not found");
        const WPresult = await axios.get(process.env.WP_UPDATE_PRODUCT, {
            params: {
                _id: property._id.toString().replace(/^"(.*)"$/, '$1'),
            }
        }); 
        console.log('WP: ',WPresult);
        res.json(property);
    } catch (e){
        console.log(e);
        next("Error in editing a property")
    }
});

// Delete a property
router.delete('/:id', authenticated, async (req, res, next) => {
    try {
        const property = await propertyModel.findOneAndDelete({_id: req.params.id, owner: req.user});
        if (!property) next("property not found");
        const WPresult = await axios.get(process.env.WP_DELETE_PRODUCT, {
            params: {
                product_id: property._id.toString().replace(/^"(.*)"$/, '$1')
            }
        }); 
        console.log('WP: ',WPresult);
        res.json(property);
    } catch (e){
        console.log(e);
        next("Error in removing a property")
    }
});

module.exports = router
