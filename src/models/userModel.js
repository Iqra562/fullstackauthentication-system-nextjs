import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Username is required"],
        unique: true
    },
    email : {
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
password:{
    type:String,
    required:[true,"Please provide a password"]
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken:String,
forgotPasswordTokenExpiry: String,
verifyToken:String,
verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("Users",userSchema);
export default User;