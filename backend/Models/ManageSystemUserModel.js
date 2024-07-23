const mongoose = require('mongoose');

const manageSystemUserSchema = new mongoose.Schema({
    Image:{
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    MiddleName:{
        type:String,
        required: true,
    },
    LastName:{
        type:String,
        required: true,
    },
    MobileNumber:{
        type:String,
    },
    EmailId:{
        type:String,
        unique: true,
    },
    Address:{
        type:String,
    },
    StartingDate:{
        type:String,
    },
    EndingDate:{
        type:String,
    },
    Salary:{
        type:Number,
    },
    OwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manageSystemUser',
    },
    AllocationDate:{
        type:Date,
    },
    RelationOfMember:{
        type:String,
    },
    UserType:{
        type:String,
        enum: ['admin', 'security','owner','member'],
    },
    Password:{
        type:String,
    },
    Proof:{
        type:String,
    }
    
});

const manageSystemUser = mongoose.model('manageSystemUser', manageSystemUserSchema);

module.exports = manageSystemUser;
