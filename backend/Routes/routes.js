const express = require('express');
const router = express.Router();
const flatController = require('../Controllers/FlatControllers');
const userController=require('../Controllers/UserControllers');
const visitorController=require('../Controllers/VisitorControllers');
const LoginController = require('../Controllers/LoginControllers');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images/'); // Set the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Define the file naming strategy
  },
});

const upload = multer({ storage: storage });
// Login routes
router.post('/login', LoginController.login);

// Define a route for adding a new User
router.post('/addAdminData',upload.single('Image'),userController.addAdminData);
router.post('/addSecurityData',upload.fields([{ name: 'Image', maxCount: 1 },{ name: 'Proof', maxCount: 1 },]),userController.addSecurityData);
router.post('/addOwnerData',upload.fields([{ name: 'Image', maxCount: 1 },{ name: 'Proof', maxCount: 1 },]),userController.addOwnerData);
router.post('/addMemberData',upload.fields([{ name: 'Image', maxCount: 1 },{ name: 'Proof', maxCount: 1 },]),userController.addMemberData);
router.post('/editUserData/:id',upload.fields([{ name: 'Image', maxCount: 1 },{ name: 'Proof', maxCount: 1 },]), userController.editUserData);
router.get('/User', userController.viewUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/getUserData/:id', userController.getUserDataFlat);
router.get('/getUserCount', userController.getUserCount);
router.get('/getAllOwner', userController.getAllOwner);
router.get('/getAllocatedFlatOwner', userController.getAllocatedFlatOwner);
router.get('/getAllotmentCount', flatController.getAllotmentCount);


// Define a route for adding a new flat
router.post('/addFlat', flatController.addFlat);
router.post('/editFlatData/:id', flatController.editFlatData);
router.get('/Flat', flatController.viewFlat);
router.delete('/deleteFlat/:id',flatController.deleteFlat);
router.get('/getFlatData/:id', flatController.getFlatDataFlat);
router.get('/getFlatCount', flatController.getFlatCount);
router.get('/AvailableFlat', flatController.AvailableFlat);





//Define a route for adding a new visitor
router.post('/addVisitorData',visitorController.addVisitor);
router.post('/editVisitorData/:id', visitorController.editVisitorData);
router.get('/Visitor', visitorController.viewVisitor);
router.delete('/deleteVisitor/:id', visitorController.deleteVisitor);
router.get('/getVisitorData/:id', visitorController.getVisitorData);
router.get('/getVisitorCount', visitorController.getVisitorCount);
module.exports = router;
