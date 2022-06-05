const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const customerServiceSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
customerServiceSchema.pre('save',function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

const customerServiceModel=mongoose.model("CustomerService",customerServiceSchema);
// customerService123=({email:"customerservice123@gmail.com",password:"customerService@123"});
module.exports=customerServiceModel;