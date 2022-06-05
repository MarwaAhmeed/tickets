const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:"Pending"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
  },
  { timestamps: true }
);


const TicketModel = mongoose.model("Ticket", ticketSchema);
module.exports = TicketModel;
