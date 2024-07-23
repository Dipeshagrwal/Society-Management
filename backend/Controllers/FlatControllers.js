const ManageFlat = require('../Models/ManageFlatModel');

// Controller for adding a new flat
module.exports.viewFlat= async (req, res) => {
  try {
    const flats = await ManageFlat.find();
    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.addFlat =async (req,res)=>{
  const {flatNo,floor,block,flatType,maintenanceCharge}=req.body
  const FlatId = `${block}_F${floor}_${flatNo}`;
    new ManageFlat({
    flatId: FlatId,
    flatNo: flatNo,
    floor: floor,
    block: block,
    flatType: flatType,
    maintenanceCharge: maintenanceCharge,
    status:false,
  }).save();
  res.send({success:true,message:"data added successfully!!"})
}

exports.deleteFlat =async (req, res) => {
  try {
    const deletedFlat = await ManageFlat.findByIdAndDelete(req.params.id);
    if (!deletedFlat) {
      return res.status(404).json({ error: 'Flat not found' });
    }
    res.json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getFlatDataFlat=async (req, res) => {
  const id = req.params.id;

  try {
      // Fetch the flat data from the database using the provided id
      const flat = await ManageFlat.findById(id); // Adjust this based on your database setup

      if (!flat) {
          return res.status(404).json({ message: 'Flat not found' });
      }

      res.json(flat);
  } catch (error) {
      console.error('Error fetching flat data:', error);
      res.status(500).json({ message: 'An error occurred while fetching flat data' });
  }
};
exports.editFlatData =async (req, res) => {
  try {

    if(req.body.Allocate)
    {
      req.body.status=true;
      req.body.AllocationDate=new Date();
    }
    
    const editedFlat = await ManageFlat.findByIdAndUpdate(req.params.id,req.body,{ new: true });
      
    if (!editedFlat) {
      return res.status(404).json({ error: 'Flat not found' });
    }
    res.json({ message: 'Flat updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.getFlatCount = async (req, res) => {
  try {
    const count = await ManageFlat.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.AvailableFlat= async (req, res) => {
  try {
    const flats = await ManageFlat.find({status:true});
    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
exports.getAllotmentCount = async (req, res) => {
  try {
    const count = await ManageFlat.countDocuments({status:true});
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};