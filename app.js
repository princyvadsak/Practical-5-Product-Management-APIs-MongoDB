require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
app.use(express.json());

const productRouter = require("./router/product");
const companyRouter = require("./router/company");
const sellerRouter = require("./router/seller");

mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGODB connect"));

app.get("/",(req,res)=>{
    return res.json({data:"Product Management Apis MongoDB"});
});

app.use("/product",productRouter);
app.use("/company",companyRouter);
app.use("/seller",sellerRouter);

app.listen(port , () => {console.log(`Application Run On Port: ${port}`);});