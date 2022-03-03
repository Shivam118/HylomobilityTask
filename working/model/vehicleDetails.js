const mongoose = require('mongoose');

const vehicleDetailSchema = new mongoose.Schema({
    companyName :{
        type: String,
        required: true
    },
    adminEmail :{
        type: String,
        required: true
    },
    modelNumber :{
        type: String,
        required: true
    },
    seater :{
        type: Number,
        required: true
    },
    fuelType :{
        type: String,
        required: true
    },
    VehicleNumber :{
        type: String,
        default: false
    },
    Amount: {
        type:Number,
        required:false
    }
});

// vehicleDetailSchema.pre('save', async function(next){
//     if (this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });


const VehicleDetail = mongoose.model('VEHICLEDETAIL', vehicleDetailSchema);

module.exports = VehicleDetail;