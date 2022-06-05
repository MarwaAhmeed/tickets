const express = require("express");
const router = express.Router();
const CustomerServiceController=require("../controllers/customerService")


router.get("/tickets",(req,res,next)=>{
   CustomerServiceController.findTickets().then((tickets)=>{
       res.json(tickets)
   }).catch((err)=>{
    res.status(422).send(err.message);
   })
})

router.get("/ticket/:id",(req,res,next)=>{
    const id=req.params.id
    CustomerServiceController.findTicket(id).then((tickets)=>{
        res.json(tickets)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
 })

router.post("/note/:id",(req,res,next)=>{
    const id=req.params.id
    CustomerServiceController.addNote(id,req.body).then((note)=>{
        res.json(note);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})


router.patch("/ticket/:id",(req,res,next)=>{
    const id=req.params.id
    CustomerServiceController.changeStatus(id,req.body).then((ticket)=>{
        res.json(ticket);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})



module.exports = router;