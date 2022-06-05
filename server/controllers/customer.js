const Customer = require("../models/customer");
const Ticket=require("../models/ticket")
const Note =require("../models/notes")

const findOne = (id) => {
  return Customer.findById(id);
};

const find = () => {
  return Customer.find();
};

const register = (body) => {
  return Customer.create(body);
};

const creatTicket=(body)=>{
    return Ticket.create(body);
}

const findUserTickets=(id)=>{
    return Ticket.find({customerId:id}).populate("customerId");
}

const addNote=(id,{comment,owner})=>{
    return Note.create({ticketId:id,comment,owner})
}
const findTicket=(id)=>{
  return Ticket.findById(id).populate("customerId");
}

const findTicketNotes=(id)=>{
    return Note.find({ticketId:id}).sort([["updatedAt",-1]]).populate("ticketId")
}

const delOne = (id) => {
  console.log(id)
  return Customer.findByIdAndDelete(id.id);
};

const editOne = (id, body) => {
  return Customer.findByIdAndUpdate(id.id, body, { new: true });
};

module.exports = {
  register,
  findOne,
  find,
  delOne,
  editOne,
  creatTicket,
  findUserTickets,
  addNote,
  findTicketNotes,
  findTicket
};
