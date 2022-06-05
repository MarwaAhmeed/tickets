const express = require("express");
const router = express.Router();
const customerController=require("../controllers/customer");

//register
router.post("/register",(req,res,next)=>{
    customerController.register(req.body).then((customer)=>{
        res.json(customer)
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

//add ticket
router.post("/ticket",(req,res,next)=>{
    customerController.creatTicket(req.body).then((ticket)=>{
        res.json(ticket)
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

//get usertickets
router.get("/tickets/:id",(req,res,next)=>{
   const id=req.params.id
   customerController.findUserTickets(id).then((tickets)=>{
       res.json(tickets)
   }).catch((err)=>{
    res.status(422).send(err.message);
   })
})

//add note to ticket
router.post("/note/:id",(req,res,next)=>{
    const id=req.params.id
    customerController.addNote(id,req.body).then((note)=>{
        res.json(note);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

//get notes of ticket
router.get("/note/:id",(req,res,next)=>{
    const id=req.params.id
    customerController.findTicketNotes(id).then((notes)=>{
        res.json(notes);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

router.get("/ticket/:id",(req,res,next)=>{
    const id=req.params.id
    customerController.findTicket(id).then((tickets)=>{
        res.json(tickets)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
 })

module.exports = router;