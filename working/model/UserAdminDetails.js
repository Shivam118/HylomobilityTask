const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userAdminDetails = new mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userAdminDetails.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign( {_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

userAdminDetails.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


const SignUserAdmin = mongoose.model('SIGNUSERADMIN', userAdminDetails);

module.exports = SignUserAdmin;
