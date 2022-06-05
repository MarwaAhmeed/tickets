const express = require("express");
const router = express.Router();
const authController=require("../controllers/auth")

router.post("/login",(req,res,next)=>{
    authController.login(req.body).then((token)=>{
        res.json(token)
    }).catch((err)=>{
        res.status(422).send("wrong please try again");
    })
})

module.exports = router;