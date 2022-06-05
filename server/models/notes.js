const mongoose = require("mongoose");

const notesSchema=mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    ticketId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    }    
}, { timestamps: true })


const NoteModel = mongoose.model("Note", notesSchema);
module.exports = NoteModel;
