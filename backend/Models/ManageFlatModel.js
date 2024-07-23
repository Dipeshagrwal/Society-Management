const mongoose = require('mongoose');

const manageFlatSchema = new mongoose.Schema({
    flatId: {
        type: String,
        required: true,
        unique: true,
    },
    flatNo: {
        type: Number,
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    flatType: {
        type: String,
        enum: ['1BHK', '2BHK', '3BHK'],
        required: true,
    },
    maintenanceCharge: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    } ,
    Allocate:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manageSystemUser',
    },  
    AllocationDate:{
       type:Date, 
    }
});

const ManageFlat = mongoose.model('ManageFlat', manageFlatSchema);

module.exports = ManageFlat;
