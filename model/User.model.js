import mongoose from "mongoose";
import authValidator from "../validation/auth.validator.js";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth:{
       type:String,
       required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['guest', 'host'],
        default:'guest'
    },
    profilePicture: {
        type: String,
        default: ''
    },
});

// validate 
 userSchema.pre('save',function(next){
    try{
         authValidator.parse(this.toObject());
         next();
    }catch(err){
        next(err)
    }
 });

//  hash password
 userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        try{
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);  
            next();
        }catch(err){
              next(err)
        }
    }
 });

 userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password);
 }

const User = mongoose.model('User', userSchema);
export default User;