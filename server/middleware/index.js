const {promisify}=require("util")
const jwt=require("jsonwebtoken")
const verify=promisify(jwt.verify);
const Customer = require("../models/customer");
const Admin =require("../models/admin")
const CustomerService= require("../models/customerService")


const customerAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  const customer = await verify(
    authorization,
    "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh"
  ).catch((err) => {
    res.status(401).end();
  });
  if (customer) {
    req.customer = await Customer.findById(customer.cId);
    console.log(customer);
    next();
  }
};

const adminAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
    const admin = await verify(
      authorization,
      "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh"
    ).catch((err) => {
      res.status(401).end();
    });
    if (admin) {
      req.customer = await Admin.findById(admin.adminId);
      console.log(admin);
      next();
    }
  };

  const customerServiceAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
    const customerService = await verify(
      authorization,
      "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemh"
    ).catch((err) => {
      res.status(401).end();
    });
    if (customerService) {
      req.customerService = await CustomerService.findById(customerService.csId);
      console.log(customerService);
      next();
    }
  };

module.exports = {customerAuth ,adminAuth,customerServiceAuth} ;