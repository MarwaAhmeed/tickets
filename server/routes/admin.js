const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/admin");


router.post("/note/:id",(req,res,next)=>{
    const id=req.params.id
    adminControler.addNote(id,req.body).then((note)=>{
        res.json(note);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})


router.get("/totaltickets",(req,res,next)=>{
    adminControler.totalTickets().then((tickets)=>{
        res.json(tickets)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
})

router.get("/totalcustomers",(req,res,next)=>{
    adminControler.totalCustomers().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
})

router.get("/customers",(req,res,next)=>{
    adminControler.customers().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
     res.status(422).send(err.message);
    })
})

router.patch("/ticket/:id",(req,res,next)=>{
    const id=req.params.id
    adminControler.changeStatus(id,req.body).then((ticket)=>{
        res.json(ticket);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

router.post("/customer",(req,res,next)=>{
    adminControler.addCustomer(req.body).then((customer)=>{
        res.json(customer)
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

router.delete("/customer/:id",(req,res,next)=>{
    const id=req.params.id
    adminControler.delOne(id).then((notes)=>{
        res.json(notes);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

router.patch("/customer/:id",(req,res,next)=>{
    const id=req.params.id
    adminControler.editCustomer(id,req.body).then((newCustomer)=>{
        res.json(newCustomer);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

router.get("/customer/:id",(req,res,next)=>{
    const id=req.params.id
    adminControler.findCustomer(id).then((customer)=>{
        res.json(customer);
    }).catch((err)=>{
        res.status(422).send(err.message);
    })
})

module.exports = router;
