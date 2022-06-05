const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
adminSchema.pre('save',function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

const AdminModel=mongoose.model("Admin",adminSchema);
// const admin=({email:"admin123@gmail.com",password:"admin@123"});
module.exports=AdminModel;