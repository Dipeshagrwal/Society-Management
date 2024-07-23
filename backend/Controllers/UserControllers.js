
const ManageFlat = require('../Models/ManageFlatModel');
const manageSystemUser=require('../Models/ManageSystemUserModel');


// Controller for adding a new flat
module.exports.viewUser= async (req, res) => {
  try {
    const user = await manageSystemUser.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.addAdminData =async (req,res)=>{
  console.log(req.body);
  console.log(req.file);
  const userData = req.body;
  const imagePath = req.file.path.replace('..\\frontend\\public\\', '..\\');
  const UserId=`Admin_${userData.FirstName}`;
  new manageSystemUser({
    userId:UserId,
    FirstName:userData.FirstName,
    MiddleName:userData.MiddleName,
    LastName:userData.LastName,
    MobileNumber:userData.MobileNumber,
    EmailId:userData.Email,
    UserType:'admin',
    StartingDate:userData.StartingDate,
    EndingDate:userData.EndingDate,
    Password:"password@123",
    Image:imagePath
  }).save();
  res.send({success:true,message:"data added successfully!!"})
}

exports.addSecurityData =async (req,res)=>{
  const userData = req.body;
  const Image1 = req.files['Image'][0].path.replace('..\\frontend\\public\\', '..\\'); // Get the filename of Image1
  const Image2 = req.files['Proof'][0].path.replace('..\\frontend\\public\\', '..\\'); 
  const UserId=`Sequrity_${userData.FirstName}`;
  new manageSystemUser({
    userId:UserId,
    FirstName:userData.FirstName,
    MiddleName:userData.MiddleName,
    LastName:userData.LastName,
    MobileNumber:userData.MobileNumber,
    EmailId:userData.Email,
    UserType:'security',
    StartingDate:userData.StartingDate,
    EndingDate:userData.EndingDate,
    Password:"password@123",
    Salary:userData.Salary,
    Address:userData.Address,
    Image:Image1,
    Proof:Image2,
  }).save();
  res.send({success:true,message:"data added successfully!!"})
}
exports.addOwnerData =async (req,res)=>{
  const userData = req.body;
  const Image1 = req.files['Image'][0].path.replace('..\\frontend\\public\\', '..\\'); // Get the filename of Image1
  const Image2 = req.files['Proof'][0].path.replace('..\\frontend\\public\\', '..\\'); 
  const UserId=`Sequrity_${userData.FirstName}`;
  new manageSystemUser({
    userId:UserId,
    FirstName:userData.FirstName,
    MiddleName:userData.MiddleName,
    LastName:userData.LastName,
    MobileNumber:userData.MobileNumber,
    EmailId:userData.Email,
    UserType:'owner',
    Password:"password@123",
    Image:Image1,
    Proof:Image2,
  }).save();
  res.send({success:true,message:"data added successfully!!"})
}

exports.addMemberData =async (req,res)=>{
  const userData = req.body;
  const Image1 = req.files['Image'][0].path.replace('..\\frontend\\public\\', '..\\'); // Get the filename of Image1
  const Image2 = req.files['Proof'][0].path.replace('..\\frontend\\public\\', '..\\'); 
  const UserId=`member _${userData.FirstName}`;
  new manageSystemUser({
    userId:UserId,
    FirstName:userData.FirstName,
    MiddleName:userData.MiddleName,
    LastName:userData.LastName,
    MobileNumber:userData.MobileNumber,
    EmailId:userData.Email,
    FlatId:userData.FlatId,
    RelationOfMember:userData.RelationOfMember,
    UserType:'member',
    Password:"password@123",
    Image:Image1,
    Proof:Image2,
  }).save();
  res.send({success:true,message:"data added successfully!!"})
}

exports.addUser =async (req,res)=>{
  const userData = req.body;
  const imagePath = req.file.path.replace('..\\frontend\\public\\', '..\\');
  const UserId=`resident_${userData.FirstName}`;
  new ManageUser({
    userId:UserId,
    FlatId:userData.FlatId,
    FirstName:userData.FirstName,
    MiddleName:userData.MiddleName,
    LastName:userData.LastName,
    MobileNumber:userData.MobileNumber,
    EmailId:userData.Email,
    AccessType:'resident',
    AllotmentDate:userData.AllotmentDate,
    Password:"password@123",
    Image:imagePath
  }).save();
  const FlatData = ManageFlat.findByIdAndUpdate({FlatId:userData.FlatId}); // Adjust this based on your database setup
  console.log(FlatData.flatId);
  res.send({success:true,message:"data added successfully!!"})
}

exports.deleteUser =async (req, res) => {
  try {
    const deletedUser = await manageSystemUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getUserDataFlat=async (req, res) => {
  const id = req.params.id;

  try {
      // Fetch the flat data from the database using the provided id
      const user = await manageSystemUser.findById(id); // Adjust this based on your database setup

      if (!user) {
          return res.status(404).json({ message: 'user not found' });
      }

      res.json(user);
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'An error occurred while fetching user data' });
  }
};
exports.getAllOwner = async (req, res) => {
  try {
    // Fetch all users with UserType 'owner' from the database
    const owners = await manageSystemUser.find({ UserType: 'owner' });

    if (!owners || owners.length === 0) {
      return res.status(404).json({ message: 'No owners found' });
    }

    res.json(owners);
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ message: 'An error occurred while fetching owners' });
  }
};
exports.getAllocatedFlatOwner = async (req, res) => {
  try {
    // Fetch all users with UserType 'owner' from the database
    const distinctAllocateUsers = await ManageFlat.distinct('Allocate');
    const GetOwners = await manageSystemUser.find({ _id: { $in: distinctAllocateUsers } });
// Assuming you have the ID of an owner in the 'Allocate' field


    if (!GetOwners || GetOwners.length === 0) {
      return res.status(404).json({ message: 'No owners found' });
    }

    res.json(GetOwners);
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ message: 'An error occurred while fetching owners' });
  }
};


exports.getUserCount = async (req, res) => {
  try {
    const count = await manageSystemUser.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.editUserData = async (req, res) => {
  try {
    // Get the user data from the request body
    const updatedUserData = req.body;
    // Check if a new image file has been uploaded
    if (req.files['Image']) {
      const Image1 = req.files['Image'][0].path.replace('..\\frontend\\public\\', '..\\'); // Get the filename of Image1
      updatedUserData.Image = Image1; // Update the image path in the user data
    }
    if (req.files['Proof']) {
      const Image2 = req.files['Proof'][0].path.replace('..\\frontend\\public\\', '..\\'); // Get the filename of Image1
      updatedUserData.Proof = Image2; // Update the image path in the user data
      }

    // Use the findByIdAndUpdate method to update the user
    const editedUser = await manageSystemUser.findByIdAndUpdate(
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
