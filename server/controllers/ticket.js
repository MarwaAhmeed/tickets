const Ticket=require("../models/ticket")
const Note =require("../models/notes")


const find=()=>{
    return Ticket.find().sort([["updatedAt",-1]]).populate("customerId");                                 //aggregate([{$group: {_id: '$customerId',count: { $sum: 1 }}}])
}

const findOne=(id)=>{
    return Ticket.findById(id).populate("customerId");
}
 
const findTicketNotes=(id)=>{
    return Note.find({ticketId:id}).sort([["updatedAt",-1]]).populate("ticketId")
}

module.exports = {
    find,
    findOne,
    findTicketNotes
}