const Admin = require("../models/admin");
const Ticket=require("../models/ticket")
const Note =require("../models/notes")
const Customer = require("../models/customer");

const findOne = (id) => {
  return Admin.findById(id);
};

const totalTickets=()=>{
    return Ticket.find().count();
}

const totalCustomers=()=>{
    return Customer.find().count();
}

const customers=()=>{
    return Customer.find();
}

const addNote=(id,{comment})=>{
    return Note.create({ticketId:id,comment,owner:"admin"})
}

const changeStatus=(id,body)=>{
    return Ticket.findByIdAndUpdate(id,body,{ new:true })
 }

 const addCustomer=(body)=>{
     return Customer.create(body);
 }
 const findCustomer=(id)=>{
    return Customer.findById(id);
}


const delOne = (id) => {
    console.log(id)
    return Customer.findByIdAndDelete(id);
  };

  const editCustomer = (id,body) => {
    console.log(id)
    return Customer.findByIdAndUpdate(id,body,{ new:true });
  };

module.exports = {
  findOne,
  addNote,
  changeStatus,
  totalTickets,
  totalCustomers,
  addCustomer,
  customers,
  delOne,
  editCustomer,
  findCustomer
};
