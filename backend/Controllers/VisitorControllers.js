
const ManageSystemUserModel=require('../Models/ManageSystemUserModel')
const ManageFlat = require('../Models/ManageFlatModel');
const ManageVisitor=require('../Models/ManageVisitorModel');


// Controller for adding a new flat
module.exports.viewVisitor= async (req, res) => {
  try {
    const visitor = await ManageVisitor.find();
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.addVisitor =async (req,res)=>{
  const userData = req.body;
  new ManageVisitor({
    VisitorName:userData.VisitorName,
    MobileNumber:userData.MobileNumber,
    Adress:userData.Adress,
    FlatId:userData.FlatId,
    WhomToMeet:userData.WhomToMeet,
    EntryTime:new Date(),
    Proof:userData.Proof,
    Status:false,
  }).save();

  res.send({success:true,message:"data added successfully!!"})
}

exports.deleteVisitor =async (req, res) => {
  try {
    const deletedUser = await ManageVisitor.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getVisitorData=async (req, res) => {
  const id = req.params.id;

  try {
      // Fetch the flat data from the database using the provided id
      const user = await ManageVisitor.findById(id); // Adjust this based on your database setup

      if (!user) {
          return res.status(404).json({ message: 'user not found' });
      }

      res.json(user);
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'An error occurred while fetching user data' });
  }
};
exports.getVisitorCount = async (req, res) => {
  try {
    const count = await ManageVisitor.countDocuments({});
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.editVisitorData = async (req, res) => {
  try {
    // Get the user data from the request body
    const user = await ManageVisitor.findById(req.params.id); // Adjust this based on your database setup

    const updatedUserData = req.body;
    updatedUserData.Out
    updatedUserData.Status = true;
    updatedUserData.ExitTime =new Date();
    const durationInMilliseconds = updatedUserData.ExitTime - user.EntryTime;
    // Convert the duration to seconds (or any other desired unit)
    updatedUserData.Duration = (durationInMilliseconds / 60000).toFixed(2);
    // Check if a new image file has been uploaded
    
    // Use the findByIdAndUpdate method to update the user
    const editedUser = await ManageVisitor.findByIdAndUpdate(
      req.params.id,
      updatedUserData,
      { new: true }
    );

    if (!editedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
