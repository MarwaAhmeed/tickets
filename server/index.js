const express =require("express");
const morgan=require("morgan");
const cors = require('cors');
const mongoose=require("mongoose");
const adminRoutes=require("./routes/admin")
const authRoutes=require("./routes/auth")
const customerRoutes=require("./routes/customer")
const CustomerServiceRoutes=require("./routes/customerService");
const ticketsRoutes=require("./routes/ticket")
const {customerAuth,adminAuth,customerServiceAuth} =require("./middleware/index")
const app =express();
const url="mongodb+srv://tickets:tickets@cluster0.qxrn06e.mongodb.net/?retryWrites=true&w=majority"; 
const port=5000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/admin",adminAuth,adminRoutes);
app.use("/auth",authRoutes);
app.use("/customer",customerAuth,customerRoutes);
app.use("/customerservice",customerServiceAuth,CustomerServiceRoutes);
app.use("/tickets",ticketsRoutes);


app.use("*",(req,res,next)=>{
    res.status(404).json({"error":"NOT FOUND"})
});


mongoose.connect(url).then(() => {
    console.log('Connected to database ')
    app.listen(port,()=>{
        console.log("APP IS Running");
    })
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})