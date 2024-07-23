const mongoose = require('mongoose');

const ManageVisitorSchema = new mongoose.Schema({
    VisitorName:{
        type: String,
        required: true,
    },
    MobileNumber:{
        type: String,
        required: true,
    },
    Adress:{
        type: String,
        required: true,
    },
    FlatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManageFlat',
    },
    WhomToMeet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManageUser',
    },
    EntryTime:{
        type:Date,
    },
    ExitTime:{
        type:Date,
    },
    Proof:{
        type: String,
        required: true,
    },
    Duration: {
        type: Number,
      },
      Status:{
        type:Boolean,
      },
    Remark:{
        type: String,
    },
   
});

const ManageVisitor = mongoose.model('ManageVisitor', ManageVisitorSchema);

module.exports = ManageVisitor;
