const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
    FullName :{
        type: String,
        required: true
    },
    adminEmail :{
        type: String,
        required: true
    },
    Number :{
        type: Number,
        required: true
    },
    UID :{
        type: Number,
        required: true
    }
});

// UserDetailSchema.pre('save', async function(next){
//     if (this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });


const UserDetail = mongoose.model('USERDETAIL', UserDetailSchema);

module.exports = UserDetail;