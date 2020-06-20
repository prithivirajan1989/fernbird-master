const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const uniqueValidtor = require('mongoose-unique-validator')

//user schema

const UserSchema = mongoose.Schema({
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     },
     name:{
        type:String
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobilenumber:{
        type: Number,
        required: true,
        unique:true
       
    },
    password:{
        type: String,
        required:true
    },
    image:{
        type:String
    },
    brandlogo:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number
    },
   
});




UserSchema.plugin(uniqueValidtor);

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback){
    User.findById(id, callback);
}

 

module.exports.getUserByEmail = function (email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.getUserByMobileNumber = function (number, callback){
    const query = {number: number}
    User.findOne(query, callback);
}


module.exports.addUser = function (newUser, callback){
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err)throw err;
            newUser.password = hash;
            newUser.save(callback);

        });
    });
}

module.exports.updateUser = function (updateUser, callback){
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(updateUser.password, salt, (err, hash)=>{
            if(err)throw err;
            updateUser.password = hash;
            updateUser.save(callback);

        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
    if(err) throw err;
    callback(null, isMatch);
  } );
}