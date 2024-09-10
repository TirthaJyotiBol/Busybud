// Define User Model

import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user'
    }
});

let UserModel = mongoose.model('User',UserSchema);

export default UserModel;