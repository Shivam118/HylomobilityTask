const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const superAdmin = new mongoose.Schema({
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
            },
        }
    ]
});

superAdmin.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

superAdmin.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const super_Admin = mongoose.model('SIGNSUPERADMIN', superAdmin);

module.exports = super_Admin;
