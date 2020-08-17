import mongoose, { model } from 'mongoose';

const userModel= new mongoose.Schema({
    firstname: mongoose.Schema.Types.String,
    lastname: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    mobileNumber: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    profilePic: mongoose.Schema.Types.String
});

export interface TokenInterface {
    user: {
       email: string;
       name: string;
       userId: string;
    };
  }


export default mongoose.model('User',userModel);
