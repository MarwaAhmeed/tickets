const Admin = require("../models/admin");
const Customer =require("../models/customer")
const CustomerService =require("../models/customerService")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login= async({email,password})=>{
    if (email==="admin123@gmail.com"){
        const admin=await Admin.findOne({email});
        const valid=await bcrypt.compare(password,admin.password);
        if(!valid){throw "UN_AUTH"}
        else{
            return{ token: jwt.sign({
                email,adminId:admin._id
            },"gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh", { expiresIn: '2d' }),
            role:"admin"}
        }
    }
    else if(email==="customerservice123@gmail.com"){
        const customerService=await CustomerService.findOne({email});
        const valid=await bcrypt.compare(password,customerService.password);
        if(!valid){throw "UN_AUTH"}
        else{
            return{ token: jwt.sign({
                email,csId:customerService._id
            },"gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh", { expiresIn: '2d' }),
            role:"customerService",
        }
        }
    }
    else{
        const customer=await Customer.findOne({email});
        const valid=await bcrypt.compare(password,customer.password);
        if(!valid){throw "UN_AUTH"}
        else{
            return{ token: jwt.sign({
                email,cId:customer._id
            },"gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh", { expiresIn: '2d' }),
            role:"customer",
            customerId:customer._id,
            email:customer.email
        }
        }
    }
}

module.exports = {login};