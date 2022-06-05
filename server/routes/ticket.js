const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket");


router.get("/",(req,res,next)=>{
    ticketController.find().then((tickets)=>{
        res.json(tickets)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
 })


 router.get("/:id",(req,res,next)=>{
    const id=req.params.id
    ticketController.findOne(id).then((tickets)=>{
        res.json(tickets)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
 })

 router.get("/notes/:id",(req,res,next)=>{
    const id=req.params.id
    ticketController.findTicketNotes(id).then((notes)=>{
        res.json(notes);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

module.exports = router;


