const express = require("express");
const router = express.Router();
router.use(express.json());

const product = require("../Model/product");
const company = require("../Model/company");
const seller = require("../Model/seller");

router.get("/companyOfProduct", async (req,res)=>{
    const title = req.body.title;
    if(title){
        const details = await product.findOne({title:title});
        if(details){
    
        const cDetail = await company.find({company_id:details["company_id"]});
        return res.json({data:cDetail});
        }
        return res.json({data:"No Data Found"});
    }
    return res.json({data:"Title is blank.plese enter title."});

});

router.get("/sellerOfProduct", async (req,res)=>{
    const title = req.body.title;
    if(title){
        const details = await product.findOne({title:title});
        if(details){
        const sDetail = await company.find({seller_id:details["seller_id"]});
        return res.json({data:sDetail});
        }
    return res.json({data:"No Data Found"});
    }
    return res.json({data:"Title is blank.plese enter title."});
});


router.post("/addProduct",(req,res)=>{
    const {addProduct} = req.body;

    if(addProduct){
        product.create(addProduct);
        return res.json({data:"New Product Add Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong"});
});

router.put("/updateProductCategory", async (req,res)=>{
    const pId = req.body.product_id;
    const cat = req.body.category;
    if(cat && pId){
    const details = await product.findOne({product_id:pId});
    if(details){
        product.findOneAndUpdate({product_id:pId , category:cat});
        return res.json({data:"Product Category Update Successfully",Update : details});
        }
    return res.json({data:"Somthing Went To Wrong"});
    }
return res.json({data:"please enter category and productid both."});
});

router.delete("/deleteProduct", async (req,res)=>{
    const pId = req.body.product_id;
    if(pId){
    const details = await product.findOne({product_id:pId});
    if(details){
        product.findOneAndDelete({product_id:pId});
        
        return res.json({data:"Delete Product Successfully",deleted:details});
       }
    return res.json({data:"Somthing Went To Wrong"});
}
return res.json({data:"please enter productid."});
});

module.exports = router;