import mongoose from "mongoose";

const DeadUserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    borndate: {type: String},
    deathdate: {type: String},
    location: {type: String},
    biography: {type: String},
    isProven: {type: Boolean, default: false}
});

export default mongoose.model('DeadUser', DeadUserSchema);