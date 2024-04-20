import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phonenumber: {type: String},
    username: {type: String},
    yearsold: {type: String},
    isActivated: {type: Boolean, default: false},
});

export default mongoose.model('User', UserSchema);