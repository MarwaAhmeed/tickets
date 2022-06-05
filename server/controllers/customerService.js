const CustomerService = require("../models/customerService");
const Ticket=require("../models/ticket")
const Note =require("../models/notes")

const create=(body)=>{
    return CustomerService.create(body)
}

const findTickets=()=>{
    return Ticket.find().populate("customerId");
}
const findTicket=(id)=>{
    return Ticket.findById(id).populate("customerId");
  }
const addNote=(id,{comment})=>{
    return Note.create({ticketId:id,comment,owner:"CustomerService"})
}

const changeStatus=(id,body)=>{
   return Ticket.findByIdAndUpdate(id,body,{ new:true })
}

module.exports={
    create,
    findTickets,
    addNote,
    changeStatus,
    findTicket
}