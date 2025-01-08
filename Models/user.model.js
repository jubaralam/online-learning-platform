const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone_no:{type:Number, required:true},
    password:{type:String, required:true},
    role:{type:String, default:"learner"}
})


const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel